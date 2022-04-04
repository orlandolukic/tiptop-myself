import { createContext, useContext, useState, useRef, useEffect } from "react";
import { Subject } from 'rxjs';

export const CurrencyContext = createContext({
    getCurrency: () => {},
    getSupportedCurrencies: () => {},
    changeCurrency: () => {},
    fetchCurrencyRates: () => {},
    isFetching: () => {},
    getRate: () => {},
    clearPendingTasks: () => {},
    sortProducts: (p1, p2) => {}
});

export function useCurrencyContextForRoot() {

    const supportedCurrencies = [ {
        ticker: "EUR",
        name: "Euro"
    }, {
        ticker: "USD",
        name: "United States Dollar"
    }, {
        ticker:  "ETH",
        name: "Ethereum",
        id: "ethereum"
    }, {
        ticker: "UST",
        name: "Terra USD",
        id: "terrausd"
    }, {
        ticker: "ADA",
        name: "Cardano",
        id: "cardano"
    } ];
    const [ currency, setCurrency ] = useState("USD");
    const [ rate, setRate ] = useState(0);
    const [ isFetching, setIsFetching ] = useState(false);
    const promise = useRef({
        obj: null,
        waitTimeout: null,
        request: 0,
        resolve: null,
        refreshInterval: null
    });  
    
    const getCurrencyByName = function(name) {        
        for (let i=0; i<supportedCurrencies.length; i++) {
            if ( supportedCurrencies[i].ticker === name )
                return supportedCurrencies[i];
        }
        return null;
    }

    let obj = {
        getCurrency: () => currency,
        getSupportedCurrencies: () => supportedCurrencies,
        fetchCurrencyRates: function() {   
            if ( currency === "USD" || currency === "EUR" ) {                
                setIsFetching(false);
                if ( promise.current.obj !== null ) {
                    promise.current.resolve();
                    promise.current.obj = null;                   

                    window.clearTimeout(promise.current.waitTimeout);
                    promise.current.waitTimeout = null;
                } 
                window.clearInterval(promise.current.refreshInterval);
                promise.current.refreshTimeout = null;                               
            } else {
                
                if ( promise.current.obj !== null ) {
                    window.clearTimeout(promise.current.waitTimeout);
                    promise.current.waitTimeout = null;

                    window.clearInterval(promise.current.refreshInterval);
                    promise.current.refreshTimeout = null;

                    // Resolve promise
                    promise.current.resolve();
                    promise.current.obj = null;
                }   
                window.clearInterval(promise.current.refreshInterval);
                promise.current.refreshTimeout = null;                 
                    
                setIsFetching(true);                                   
                promise.current.obj = new Promise((resolve) => {                    
                    let id = getCurrencyByName(currency).id;
                    let req = promise.current.request;  
                    promise.current.request++;
                    promise.current.resolve = resolve;                  
                    fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + id + "&vs_currencies=USD", {
                        method: "GET",                                                                      
                    }).then(( resp ) => resp.json()).then((data) => {                         
                        
                        if ( req + 1 !== promise.current.request ) {
                            resolve();
                            return;
                        }                         

                        promise.current.waitTimeout = window.setTimeout(() => {

                            if ( req + 1 !== promise.current.request ) {
                                resolve();
                                return;
                            } 
                            setRate(data[id].usd);                            
                            promise.current.obj = null;    
                            setIsFetching(false);                                
                            
                            promise.current.refreshInterval = window.setInterval(() => {
                                fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + id + "&vs_currencies=USD", {
                                    method: "GET",                                                                      
                                }).then(( resp ) => resp.json()).then((d) => {                                     
                                    setRate( d[id].usd );
                                });
                            }, 10000);
                            
                            resolve();
                        }, 1200);                                                
                    });
                });

            }
        },
        changeCurrency: function(newone) {            
            if ( supportedCurrencies.indexOf(newone) > -1 ) {
                setCurrency(newone.ticker);                                         
            }
        },        
        isFetching: function() {
            return isFetching;
        },
        getRate: function() {
            return rate;
        },
        clearPendingTasks: function() {            
            window.clearInterval( promise.current.refreshInterval );
            promise.current.refreshInterval = null;

            if ( promise.current.obj !== null ) {
                window.clearTimeout(promise.current.waitTimeout);
                promise.current.waitTimeout = null;           

                // Resolve promise
                promise.current.resolve();
                promise.current.obj = null;   
            }
        },
        
        sortProducts: function( p1, p2 ) {
            switch ( currency ) {
            case "EUR":
            case "USD":
                return p1["price" + currency] > p2["price" + currency] ? 1 : p1["price" + currency] === p2["price" + currency] ? 0 : -1;                
            default:
                return p1["priceUSD"] > p2["priceUSD"] ? 1 : p1["priceUSD"] === p2["priceUSD"] ? 0 : -1;                
            }
        }
    }

    useEffect(() => {        
        obj.fetchCurrencyRates();
    }, [currency]);

    useEffect(() => {        
        return () => {            
            if ( promise.current.obj !== null ) {                
                promise.current.resolve();
                promise.current.obj = null;
                window.clearTimeout( promise.current.waitTimeout );
                promise.current.waitTimeout = null;                
            }            

            window.clearInterval( promise.current.refreshInterval );
            promise.current.refreshInterval = null;
        };
    }, []);

    return obj;
}

export function useCurrencyContext() {
    return useContext(CurrencyContext);
}