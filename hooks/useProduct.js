import { Mutex } from "lib/semaphore";
import { useStateWithLabel } from "lib/utils";
import { createContext, useContext, useEffect, useRef, useState } from "react";


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
        deleteItem: async (item) => {},
        hasProduct: (id) => {}
    }
});

export function useProductContextRoot() {    
    let [ productsWishlist, setProductsWishlist ] = useState([]); 
    let [ productsCart, setProductsCart ] = useState([]); 
    let [ refreshCart, setRefreshCart ] = useStateWithLabel(0, "RefreshCart");
    let [ refreshWishlist, setRefreshWishlist ] = useStateWithLabel(0, "RefreshWishlist");
      
    let [ mutexWishlist ] = useStateWithLabel( Mutex() );
    let elementsInWishlist = useRef({
        array: productsWishlist,
        elements: productsWishlist.length
    });

    useEffect(() => {

        if ( productsWishlist.length === elementsInWishlist.current.elements && productsWishlist.length === 0 )        
            return;
        if ( productsWishlist.length < elementsInWishlist.current.elements ) {            
            // Unblock waiting request
            mutexWishlist.release();
        } else if ( productsWishlist.length > elementsInWishlist.current.elements  ) {
            // Unblock waiting request
            mutexWishlist.release();
        };
        elementsInWishlist.current = {
            array: productsWishlist,
            elements: productsWishlist.length
        };

    }, [productsWishlist.length]);
    
    return {
        wishlist: {
            getNumberOfProducts: () => productsWishlist.length,
            getProducts: () => productsWishlist,
            refresh: () => { setRefreshWishlist(refreshWishlist+1); },
            putProductInWishlist: async function(p) { 
                await mutexWishlist.acquire();
                await new Promise((resolve) => {
                    setTimeout(() => {
                        setProductsWishlist([
                            ...elementsInWishlist.current.array,
                            p
                        ]);  
                        resolve();
                    }, 650); 
                });
            },
            getTotalQuantity: () => productsWishlist.length,
            deleteItem: async function (id) {               
                
                await mutexWishlist.acquire();             
                await new Promise((resolve, reject) => {
                    let r = this.refresh;                     
                    setTimeout(() => {                        
                        setProductsWishlist( 
                            elementsInWishlist.current.array.filter((el) => {                               
                                if ( el.id === id )
                                    return false;
                                return true;
                            })
                        );                                                                                                                                                 
                        resolve();
                    }, 1000);                    
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

        // =========================================================================
        //      CART
        // =========================================================================
        
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
            },
            hasProduct: function(id) {
                for (let i=0; i < productsCart.length; i++) {
                    if ( productsCart[i].id === id )
                        return true;
                }
                return false;
            }
        }

    };    
}

export function useProductContext() {
    return useContext(ProductContext);
}