import { createContext, useContext, useState } from "react";


export const ProductContext = createContext({
    wishlist: {
        getNumberOfProducts: () => {},
        getProducts: () => {},
        refresh: () => {},
        putProductInWishlist: () => {},
        getTotalQuantity: () => 0,
        deleteItem: (item) => {}
    },

    cart: {
        getNumberOfProducts: () => {},
        getProducts: () => {},
        refresh: () => {},
        putProductInCart: () => {},
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
    let [ refreshCart, setRefreshCart ] = useState(0);
    let [ refreshWishlist, setRefreshWishlist ] = useState(0);
    
    return {
        wishlist: {
            getNumberOfProducts: () => productsWishlist.length,
            getProducts: () => productsWishlist,
            refresh: () => { setRefreshWishlist(refreshWishlist+1); },
            putProductInWishlist: function(p) {            
                setProductsWishlist([
                    ...productsWishlist,
                    p
                ]);            
            },
            getTotalQuantity: () => 0,
            deleteItem: (item) => {}
        }, 
        
        cart: {
            getNumberOfProducts: () => productsCart.length,
            getProducts: () => productsCart,
            refresh: () => { setRefreshCart(refreshCart+1); },
            putProductInCart: function(p) {
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
                setProductsCart([]);
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