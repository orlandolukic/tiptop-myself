
import { faHeart, faHeartBroken, faRemove, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@mui/material';
import { LoaderRing } from 'components/loader/loaderRing';
import { ProductContext } from 'hooks/useProduct';
import { FormatNumber } from 'lib/number';
import { ClassManager } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import s from './singleProduct.module.scss';

export function SingleProduct({ singleProduct, columns, animateTimeout, index, ...rest }) {
    
    const timeoutForToast = 2000;
    const productContext = useContext(ProductContext);
    const router = useRouter();
    const { product, animationDelay, animationDuration } = singleProduct;
    const { image, name, brand, category, id, priceEUR, priceUSD } = product;
    const { xs, sm, md, lg } = columns;
    const [ addingToCart, setAddingToCart ] = useState(false);
    const [ addingToWishlist, setAddingToWishlist ] = useState(false);
    const [ inWishlist, setInWishlist ] = useState( productContext.wishlist.hasProduct(id) );
    const [ inCart, setInCart ] = useState( productContext.cart.hasProduct(id) );
    const timeouts = useRef({
        timeoutWishlist: null
    });
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {            
            isMounted.current = false;
            window.clearTimeout(timeouts.current.timeoutWishlist);
        };
    }, []);

    let classes = ClassManager().addClasses([
        'col-' + (12/xs),
        "col-sm-" + (12/sm),
        "col-md-" + (12/md),
        "col-lg-" + (12/lg), 
        "mb-5"       
    ]).getClassName();

    let productPlaceholderClassName = ClassManager().addClasses([
        s['single-product-placeholder'],
        s['animated'],        
    ]);
    productPlaceholderClassName = productPlaceholderClassName.getClassName();

    const productClick = (e) => {        
        router.push('/collections/' + id);
    };

    const addToCart = (e) => {
        e.stopPropagation();  
        setAddingToCart(true);
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {                 
                    setAddingToCart(false);  
                    setInCart(true);             
                    resolve();
                }, 2500)
            }), {
                pending: "Adding to cart...",
                success: {
                    render: ({data}) => <>
                        <div>You&apos;ve successfully added product <strong>&apos;{name}&apos;</strong> to the cart.</div>
                        <div className='mt-2'>
                            <Link href="/cart">
                                <Button variant="outlined">Show Cart</Button>                            
                            </Link>                            
                        </div>
                    </>
                },
                "error": "An error occured, please try again later"                
            },
            {
                autoClose: timeoutForToast
            }
        );
    }

    const addToWishlist = (e) => {
        e.stopPropagation();
        setAddingToWishlist(true);
        
        toast.promise(
            new Promise((resolve) => {
                timeouts.current.timeoutWishlist = window.setTimeout(async () => {                                         
                    if ( !inWishlist ) {               
                        await productContext.wishlist.putProductInWishlist({
                            id: id
                        });
                    } else {
                        await productContext.wishlist.deleteItem(id);
                    }     
                    if ( !isMounted.current ) {             
                        resolve(inWishlist);
                        return;
                    }
                    setAddingToWishlist(false);   
                    setInWishlist(!inWishlist);
                    resolve(inWishlist);
                }, 2500)
            }), {
                pending: !inWishlist ? "Adding to wishlist..." : "Removing from wishlist...",
                success: {
                    render: ({data}) => <>
                        {!data && 
                        <div>You&apos;ve successfully added product <strong>&apos;{name}&apos;</strong> to the wishlist.</div>                        
                        }
                        {data && 
                        <div>You&apos;ve successfully removed product from the wishlist.</div>                        
                        }                        
                    </>
                },
                "error": "An error occured, please try again later"                
            },
            {
                autoClose: timeoutForToast
            }
        );
    }

    const tooltipWishlist = !inWishlist ? "Add to wishlist" : "Remove from wishlist";

    useEffect(() => {       
        if ( !addingToCart || !addingToWishlist ) {
            productContext.wishlist.refresh();
        }
    }, [addingToCart, addingToWishlist]);

    return (
        <>            
            <div className={classes} onClick={productClick}>
                <div className={productPlaceholderClassName} style={{
                    animationDelay: animationDelay + "ms",
                    animationDuration: animationDuration + "ms"
                }}>
                    <div className={s['single-product-image']}>
                        <img src={image} />
                        <div className={ClassManager().addClass(s['single-product-add-to-cart']).addClassWithRoot(s, addingToCart ? "adding-to-the-cart" : null).getClassName()} onClick={addToCart}>
                            <div className={s['button']}>
                                {!addingToCart && 
                                    <>
                                    {!inCart &&  
                                        <><FontAwesomeIcon icon={faShoppingCart} /> <span className='ps-2'>Add to Cart</span></>
                                    }
                                    {inCart &&  
                                        <><FontAwesomeIcon icon={faRemove} /> <span className='ps-2'>Remove from Cart</span></>
                                    }
                                    </>
                                }
                                {addingToCart && 
                                <>
                                    <LoaderRing classNames={"color-white"} variation="small" /> Working on it...
                                </>
                                }
                                
                            </div>
                        </div>
                        <div className={ClassManager().addClassWithRoot(s, 'single-product-add-to-wishlist').addClassWithRoot(s, addingToWishlist ? "adding-to-wishlist" : null).getClassName()} onClick={addToWishlist}>
                            <Tooltip title={tooltipWishlist} placement='left'>
                                <div className={s['button']}>                                
                                    <FontAwesomeIcon icon={!inWishlist ? faHeart : faHeartBroken} />                                                                                        
                                </div>
                            </Tooltip>                                
                        </div>
                    </div>                    
                    <div className={ClassManager().addClassWithRoot(s, "single-product-details").getClassName()}>
                        <div className={s['title']}>
                            {name}
                        </div>
                        <div className={s['brand']}>
                            {brand}
                        </div>
                        <div className={s['price']}>
                            ${FormatNumber(priceUSD/100, 2)}
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}