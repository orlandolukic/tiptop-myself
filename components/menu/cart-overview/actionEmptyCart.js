import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "../../../hooks/useProduct";
import { ClassManager } from "../../../lib/utils";
import { LoaderRing } from "../../loader/loaderRing";


export function ActionEmptyCart({s, isLoading, hide, ...rest}) {

    const { cart } = useContext(ProductContext);   
    const { deleteCart, setDeleteCart } = rest["deleteCart"]; 

    const onClick = function(e) {  
        if ( isLoading )      
            return;
        setDeleteCart(true);        
    }

    useEffect(async () => {
        if ( deleteCart ) {
            // Perform API call
            await cart.flush();
            toast.success("Shopping cart successfully emptied!", {
                autoClose: 4000,                      
                onOpen: () => {                                                                    
                    hide();
                    setDeleteCart(false);
                }    
            });         
        }
    }, [deleteCart]);

    const styleForLoader = {
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        div: {
            width: "12px",
            height: "12px",            
            margin: "10px",
            borderWidth: "2px"
        }
    }

    return (
        <>
            <div className={ClassManager().addClasses( [s['to-empty-cart'], deleteCart ? s['is-loading'] : null] ).getClassName()}>
                {(deleteCart || isLoading) &&                     
                    <LoaderRing style={styleForLoader} classNames={['color-primary']} />                   
                }
                <div className={s['text']} onClick={onClick}>
                    <span>
                        {(!deleteCart && !isLoading) ? "Empty Cart" : "Please wait..." }                                        
                    </span>                    
                </div>                                
            </div>
        </>
    );
}