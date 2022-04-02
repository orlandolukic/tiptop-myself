import React, { useEffect, useRef, useState, useContext, Children, isValidElement, cloneElement } from "react";
import { Menu } from "../menu/menu";
import { DataUserContainer } from "../data/dataUserContainer";
import { UserContext } from "../../hooks/useUser";
import { LoadingContext } from "../../hooks/useLoading";
import { Loader } from "../loader/loader";
import { ProductContext, useProductContextRoot, useWishlist, useWishlistRoot, WishlistContext } from "../../hooks/useProduct";
import { LayoutContext, useLayoutContextRoot } from "../../hooks/useLayout";
import { CurrencyContext, useCurrencyContextForRoot } from "hooks/useCurrency";


export default function Layout(props) {
    
    //var marginTop = typeof props.marginTop !== typeof undefined ? props.marginTop : 67;    
    var [ marginTop, setMarginTop ] = useState(typeof props.marginTop !== typeof undefined ? props.marginTop : 67);  
    var ref = useRef( React.createRef() );
    var userContext = useContext(UserContext);
    let [ menuBarHeight, setMenuBarHeight ] = useState(67);

    useEffect(() => {
        if ( props.marginTop === undefined )
            return;                    
        setMarginTop(props.marginTop);
    }, [props.marginTop]);

    useEffect(() => {
        if ( props.setMarginTop ) {
            setMarginTop( typeof props.marginTop !== typeof undefined ? props.marginTop : menuBarHeight );
        };
    }, [props.setMarginTop, menuBarHeight]);

    let [ userDataObj, setUserDataObj ] = useState( userContext.data );
    let [ userOperationsObj, setUserOperationsObj ] = useState( userContext.operations );
    let [ isLoggedIn, setIsLoggedIn ] = useState( userContext.isLoggedIn );
    let [ isLoading, setIsLoading ] = useState( true );
    const showCurrency = typeof props.showCurrency === typeof undefined ? false : props.showCurrency;

    // Wishlist context
    const productContext = useProductContextRoot();

    const getHandlers = (newHandlers) => {
        setUserOperationsObj(newHandlers);
    }
    const changeUser = (userData) => {
        setUserDataObj(userData);
        setIsLoggedIn(true);
    }
    const userNotFoundFallback = () => {        
        setIsLoggedIn(false);
    }
    const handlers ={
        setHandlers: getHandlers,
        changeUser: changeUser,
        userNotFoundFallback: userNotFoundFallback,
        setLoggedIn: (val) => { 
            setIsLoggedIn(val);
            loadingContext.endLoading();
        }
    };

    // Loading context
    const loadingContext = useContext(LoadingContext);
    loadingContext.startLoading = () => {        
        setIsLoading(true);
    };
    loadingContext.endLoading = () => {
        setIsLoading(false);
    };

    // Get layout context
    const layoutContext = useLayoutContextRoot(menuBarHeight); 
    
    // Currency context 
    const currencyContext = useCurrencyContextForRoot();

    return (
        <>    
            <LayoutContext.Provider value={layoutContext}>
                <LoadingContext.Provider value={loadingContext}>
                    <CurrencyContext.Provider value={currencyContext}>
                        <UserContext.Provider value={{ data: userDataObj, operations: userOperationsObj, isLoggedIn: isLoggedIn }}>
                            <ProductContext.Provider value={productContext}>
                                <DataUserContainer handlers={handlers} />
                                <Menu innerRef={ref} setMenuBarHeight={setMenuBarHeight} showCurrency={showCurrency} />
                                <div style={{marginTop: marginTop + "px"}}>
                                    {props.children}
                                </div>
                                <Loader isLoading={isLoading} />                    
                            </ProductContext.Provider>                    
                        </UserContext.Provider>   
                    </CurrencyContext.Provider>         
                </LoadingContext.Provider>          
            </LayoutContext.Provider>                  
        </>
    );
}