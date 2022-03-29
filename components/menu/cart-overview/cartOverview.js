
import s from '../Menu.module.scss';
import { toast } from 'react-toastify';
import { createRef, Fragment, useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../hooks/useProduct';
import { SingleProduct } from './singleProduct';
import { EmptyCart } from './emptyCart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ActionEmptyCart } from './actionEmptyCart';
import Button from '../../button/button';
import {useRouter} from 'next/router';
import { ClassManager } from 'lib/utils';
import { FormatNumber } from 'lib/number';

export function CartOverview({scrollTopState, hide, ...rest}) {

    const productContext = useContext(ProductContext);
    const router = useRouter();
    let [ isLoading, setIsLoading ] = useState(false);
    let [ deleteCart, setDeleteCart ] = useState(false);
    let [ total, setTotal ] = useState(0);
    let [ discount, setDiscount ] = useState(0);
    const { scrollTop, setScrollTop } = scrollTopState;    
    let productsRef = createRef();

    const btnClickShowCart = (e) => {
        router.push("/cart");   
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            hide();
        }, 250);             
    };  

    useEffect(() => {                      
        if ( scrollTop && productsRef.current !== null ) {                                    
            productsRef.current.scrollTop = 0;                         
        }
        setScrollTop(false);
    }, [scrollTop]);

    useEffect(() => {
        let pr = productContext.cart.getProducts();
        let t = 0;
        let tDiscount = 0;
        pr.forEach((item) => {
            t += item.price * item.quantity;
            tDiscount += item.discount * item.quantity;
        });
        setTotal(t);    
        setDiscount(tDiscount);    
    }, [productContext.cart.getNumberOfProducts(), productContext.cart.getRefreshAttempts()]);

    let toPrint;
    let toPrintContent = productContext.cart.getNumberOfProducts() > 0;
    if ( toPrintContent ) {
        toPrint = (
            <>                
                <div ref={productsRef} className={s['cart-overview-products']}>
                    {productContext.cart.getProducts().map((product, index) => (
                        <SingleProduct key={'i' + index} product={product} loading={{setIsLoading, hide}}></SingleProduct>
                    ))}                    
                </div>
                <div className={s['cart-overview-total']}>

                    <div className={s['overview-item']}>
                        <div className={s['overview-item-name']}>Price</div>
                        <div className={ClassManager().addClassesWithRoot(s, ['overview-item-value', 'overview-item-regular']).getClassName()}>
                            ${FormatNumber(total)}
                        </div>
                    </div>

                    <div className={s['overview-item']}>
                        <div className={s['overview-item-name']}>Discount</div>
                        <div className={ClassManager().addClassesWithRoot(s, ['overview-item-value', 'overview-item-regular' , discount > 0 ? 'discount' : null]).getClassName()}>
                            {discount > 0 &&
                            <span className={s['discount-percentage']}>-{FormatNumber(discount/total * 100, 0)}%</span>
                            }                            
                            <span className={s['discount-amount']}>${FormatNumber(discount)}</span>
                        </div>
                    </div>

                    <div className={s['overview-item']}>
                        <div className={s['overview-item-name']}>Subtotal</div>
                        <div className={s['overview-item-value']}>${FormatNumber(total - discount)}</div>
                    </div>

                    <div className={s['overview-item']}>
                        <div className={s['overview-item-name']}>Shipping</div>
                        <div className={ClassManager().addClassesWithRoot(s, ['overview-item-value', 'overview-item-regular']).getClassName()}>
                            Calculated at checkout
                        </div>
                    </div>                

                    <Button 
                        variant="outlined" 
                        size="xs"
                        color="secondary" 
                        className="mt-2 text-center text-uppercase font-s-10" 
                        onClick={btnClickShowCart}>
                        Show Cart
                    </Button>
                </div>
            </>            
        );
    } else {
        toPrint = (
            <EmptyCart style={s} />
        );
    }    
    
    return (
        <Fragment>                          
            <div className={s['cart-overview-wrapper']}>
                <div className={s['cart-overview-placeholder']}> 
                    <div className={s['title']}>    
                        <div className={s['icon-1']}>
                            <FontAwesomeIcon icon={faShoppingBag} size='xl' />                            
                        </div>                      
                        <div className={s['title-text']}>Shopping Cart</div>
                        {toPrintContent && (
                            <ActionEmptyCart s={s} 
                            isLoading={isLoading}
                            hide={hide}
                            deleteCart={{deleteCart: deleteCart, setDeleteCart: function(value) { 
                                setDeleteCart(value);
                                setIsLoading(value);                                
                             }}} />
                        )}                        
                    </div>               
                    {toPrint} 
                    { isLoading && 
                        <div className={s['cart-overview-overlay']}></div>              
                    }                   
                    
                </div>     
            </div>                   
        </Fragment>
    );
}