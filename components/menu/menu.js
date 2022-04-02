import style from './Menu.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCoffee, faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useProductContext } from '../../hooks/useProduct';
import { ActionMenu } from './actionMenu';
import { CartOverview } from './cart-overview/cartOverview';
import { CurrencyChanger } from './currency-changer/currencyChanger';

export function Menu(props) { 

    let [ resizeHandler, setResizeHandler ] = useState( () => (e) => {        
        props.setMenuBarHeight(ref.current.clientHeight);
    } );
    let [ x, setX ] = useState(false);
    let [ inTransition, setInTransition ] = useState(false);
    let [ inTransitionTimeout, setInTransitionTimeout ] = useState( -1 );
    let [ scrollTop, setScrollTop ] = useState(false);
    let [ showCart, setShowCart ] = useState(false);
    let [ inc, setInc ] = useState(1);

    const ref = useRef(null);  
    const router = useRouter();  
    const productContext = useProductContext();

    useEffect(() => {                   
        props.setMenuBarHeight(ref.current.clientHeight);
    }, [ref]);

    useEffect(() => {                 
        window.addEventListener('resize', resizeHandler);        
        return () => {
            window.removeEventListener('resize', resizeHandler);                        
        }
    }, [resizeHandler]);


    const slowLinkChange = (dest, delay) => {
        if ( inTransition )
            return; 

        productContext.cart.putProductInCart({
            id: inc,
            name: "Pull & Bear",
            brand: "Pull & Bear",
            category: "Black Ripped Jeans",
            price: 2500,
            currency: "USD",
            size: "XS",
            image: "product-1.webp",
            quantity: 1,
            discount: 200 + Math.random()*600
        });        
        //setInc(inc+1);

        /*
        NProgress.start();
        setInTransition(true);
        setInTransitionTimeout( window.setTimeout(() => {
            router.push(dest);
            NProgress.done();
            setInTransition(false);                        
        }, delay) );*/
    }

    const routeChangeStartHandler = (e) => {
        if ( inTransition )
            window.clearTimeout(inTransitionTimeout);
        setInTransition(false);
        setInTransitionTimeout(-1);
    };

    useEffect(() => {
        router.events.on("routeChangeStart", routeChangeStartHandler);
        return () => {
            router.events.off('routeChangeStart', routeChangeStartHandler);
        };
    });

    const onMouseEnter = (e) => {
        setShowCart(true);
        setScrollTop(true);
    };

    const onMouseLeave = (e) => {
        setShowCart(false);
    };
    
    return (
        <div ref={ref} className={style['menu-placeholder']}>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 d-flex align-items-center'>
                        <Link href="/">
                            <a>
                                <div className={style['logo-placeholder']}>
                                    <div className={style['logo']}>
                                        <img src='assets/images/logo.svg' />
                                    </div>
                                    <div className={style['name']}>tiptop</div>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>                        
                        <div className={style['action-menu-placeholder']}>  

                            <CurrencyChanger showCurrency={props.showCurrency} />                          

                            <ActionMenu 
                                classes={['icon-heart']}                               
                                slowLinkChange={slowLinkChange}
                                icon={faHeart}
                                path="wishlist"
                            />                                                                                                     

                            <ActionMenu                                
                                slowLinkChange={slowLinkChange}
                                icon={faBagShopping}
                                path="cart"
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                classes={[ showCart ? "show-cart-overview" : null ]}
                            >
                                <CartOverview hide={() => {setShowCart(false)}} scrollTopState={{scrollTop, setScrollTop}}></CartOverview>
                            </ActionMenu> 

                            <ActionMenu                                
                                slowLinkChange={slowLinkChange}
                                icon={faUserCircle}
                                path={null}
                            />                                                                          
                            
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export const MenuStyle = style;
