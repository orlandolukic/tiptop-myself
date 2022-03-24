import style from './Menu.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCoffee, faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

export function Menu(props) { 

    let [ resizeHandler, setResizeHandler ] = useState( () => (e) => {        
        props.setMenuBarHeight(ref.current.clientHeight);
    } );
    let [ x, setX ] = useState(false);
    let [ inTransition, setInTransition ] = useState(false);
    let [ inTransitionTimeout, setInTransitionTimeout ] = useState( -1 );

    const ref = useRef(null);  
    const router = useRouter();  

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

        NProgress.start();
        setInTransition(true);
        setInTransitionTimeout( window.setTimeout(() => {
            router.push(dest);
            NProgress.done();
            setInTransition(false);                        
        }, delay) );
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

                            <div className={style['action-menu'] + " " + style['icon-heart']} onClick={slowLinkChange.bind(null, '/wishlist', 100 + Math.random() * 300) }>
                                <div className={style['icon']}>
                                    <FontAwesomeIcon icon={faHeart} size="xl" />
                                </div>
                            </div>                                                         

                            <div className={style['action-menu']} onClick={slowLinkChange.bind(null, '/cart', 150 + Math.random() * 300) }>
                                <div className={style['icon']}>
                                    <FontAwesomeIcon icon={faBagShopping} size="xl" />
                                </div>
                            </div>

                            <div className={style['action-menu']}>
                                <div className={style['icon']}>
                                    <FontAwesomeIcon icon={faUserCircle} size="xl" />
                                </div>
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export const MenuStyle = style;