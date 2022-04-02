import { createContext, useContext, useState } from "react";

export const CurrencyContext = createContext({
    getCurrency: () => {},
    getSupportedCurrencies: () => {},
    changeCurrency: () => {}
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
        name: "Ethereum"
    }, {
        ticker: "UST",
        name: "Terra USD"
    }, {
        ticker: "ADA",
        name: "Cardano"
    } ];
    const [ currency, setCurrency ] = useState("USD");

    return {
        getCurrency: () => currency,
        getSupportedCurrencies: () => supportedCurrencies,
        changeCurrency: function (newone) {            
            if ( supportedCurrencies.indexOf(newone) > -1 ) {
                setCurrency(newone.ticker);
            }
        }
    }
}

export function useCurrencyContext() {
    return useContext(CurrencyContext);
}