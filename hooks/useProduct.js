import { createContext, useContext, useState } from "react";


export const ProductContext = createContext({
    wishlist: {
        getNumberOfProducts: () => {},
        getProducts: () => {},
        refresh: () => {},
        putProductInWishlist: () => {}
    },

    cart: {
        getNumberOfProducts: () => {},
        getProducts: () => {},
        refresh: () => {},
        putProductInCart: () => {}
    }
});

export function useProductContextRoot() {    
    let [ productsWishlist, setProductsWishlist ] = useState([]); 
    let [ productsCart, setProductsCart ] = useState([]);           
    
    return {
        wishlist: {
            getNumberOfProducts: () => productsWishlist.length,
            getProducts: () => productsWishlist,
            refresh: () => { setRefresh(refresh+1); },
            putProductInWishlist: function(p) {            
                setProductsWishlist([
                    ...productsWishlist,
                    p
                ]);            
            }
        }, 
        
        cart: {
            getNumberOfProducts: () => productsCart.length,
            getProducts: () => productsCart,
            refresh: () => { setRefresh(refresh+1); },
            putProductInCart: function(p) {            
                setProductsCart([
                    ...productsCart,
                    p
                ]);            
            }
        }

    };    
}

export function useProductContext() {
    return useContext(ProductContext);
}