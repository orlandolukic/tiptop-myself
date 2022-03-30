import { useStateWithLabel } from "lib/utils";
import { createContext, useContext, useEffect, useState } from "react";


export const ProductContext = createContext({
    wishlist: {
        getNumberOfProducts: () => {},
        getProducts: () => {},
        refresh: () => {},
        putProductInWishlist: async () => {},
        getTotalQuantity: () => 0,
        deleteItem: async (item) => {},
        hasProduct: (id) => {}
    },

    cart: {
        getNumberOfProducts: () => {},
        getProducts: () => {},
        refresh: () => {},
        putProductInCart: async () => {},
        flush: async () => {},
        setQuantityForProduct: async (product, quantity) => {},
        getRefreshAttempts: () => {},
        getTotalQuantity: () => {},
        deleteItem: async (item) => {}
    }
});

export function useProductContextRoot() {    
    let [ productsWishlist, setProductsWishlist ] = useState([]); 
    let [ productsCart, setProductsCart ] = useState([]); 
    let [ refreshCart, setRefreshCart ] = useStateWithLabel(0, "RefreshCart");
    let [ refreshWishlist, setRefreshWishlist ] = useStateWithLabel(0, "RefreshWishlist");
    
    let [ toDeleteWishlist, setToDeleteWishlist ] = useStateWithLabel([], "ToDeleteWishlist");
    let [ toDeleteWishlistIndex, setToDeleteWishlistIndex ] = useStateWithLabel(-1, "ToDeleteWishlistIndex");    

    useEffect(() => {
        
        console.log("here");
        if ( toDeleteWishlist.length > 0 ) {         
            let deleteRequest = toDeleteWishlist[toDeleteWishlistIndex];
            setProductsWishlist( 
                productsWishlist.filter((el) => {
                    if ( el.id === deleteRequest.id )
                        return false;
                    return true;
                })
            ); 
            deleteRequest.resolve();

            if ( toDeleteWishlistIndex + 1 === toDeleteWishlist.length ) {
                setToDeleteWishlist([]);
                setToDeleteWishlistIndex(-1);
            } else {
                setToDeleteWishlistIndex(toDeleteWishlistIndex+1);
            }           
        }
    }, [ toDeleteWishlistIndex ]);



    const addDeleteRequest = async function( id, refresh ) {          
        return new Promise((resolve) => {                        
            toDeleteWishlist.push({
                id: id,                
                resolve: resolve
            });             
            if ( toDeleteWishlistIndex === -1 ) {
                setToDeleteWishlistIndex(0);
            }
        });            
    };
    
    return {
        wishlist: {
            getNumberOfProducts: () => productsWishlist.length,
            getProducts: () => productsWishlist,
            refresh: () => { setRefreshWishlist(refreshWishlist+1); },
            putProductInWishlist: async function(p) {            
                productsWishlist.push(p);  
                this.refresh();          
            },
            getTotalQuantity: () => productsWishlist.length,
            deleteItem: async function (id) {                
                return new Promise((resolve, reject) => {
                    let r = this.refresh;                     
                    setTimeout(async () => {
                        await addDeleteRequest(id, r);                                                       
                        resolve();
                    }, 2000);                    
                });            
            },
            hasProduct: (id) => {
                for (let i=0; i < productsWishlist.length; i++) {
                    if ( productsWishlist[i].id === id )
                        return true;
                }
                return false;
            }
        }, 
        
        cart: {
            getNumberOfProducts: () => productsCart.length,
            getProducts: () => productsCart,
            refresh: () => { setRefreshCart(refreshCart+1); },
            putProductInCart: async function(p) {
                for (let i=0; i<productsCart.length; i++) {
                    if ( productsCart[i].id === p.id ) {
                        productsCart[i].quantity += p.quantity;                                              
                        this.refresh();
                        return;
                    }
                }            
                setProductsCart([
                    ...productsCart,
                    p
                ]);            
            },
            flush: async function() {                
                return new Promise((resolve) => {                
                    setTimeout(() => {
                        setProductsCart([]);
                        resolve();
                    }, 1500);
                });
            },
            setQuantityForProduct: async function(product, quantity) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        productsCart.forEach((v) => {
                            if ( v.id === product.id ) {
                                v.quantity = quantity;                        
                                setRefreshCart(refreshCart+1);
                            }
                        });
                        resolve();
                    }, 430 + Math.random() * 250);
                });                
            },
            getRefreshAttempts: function() {
                return refreshCart;
            },
            getTotalQuantity: function() {
                let q = 0;
                for (let i=0; i<productsCart.length; i++) {
                    q += productsCart[i].quantity;
                } 
                return q;
            },
            deleteItem: async (item) => {
                // Send request to the server to delete shopping cart
                // ...
                // and then  
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        setProductsCart( 
                            productsCart.filter((el) => {
                                if ( el.id === item.id )
                                    return false;
                                return true;
                            })
                        );               
                        resolve();
                    }, 2000);                    
                });                           
            }
        }

    };    
}

export function useProductContext() {
    return useContext(ProductContext);
}