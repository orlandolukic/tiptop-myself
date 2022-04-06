import { useCurrencyContext } from "hooks/useCurrency";
import { useEffect, useState, useRef, useCallback } from "react";
import { SingleProduct } from "./single-product/singleProduct";


export function Products({ products, showProducts, filters, activeFilters, resetProductsOrder }) {

    const previewLimit = 20;
    const animationDelayIncrement = 200;
    const animationDuration = 2500;

    const [ allProducts, setAllProducts ] = useState( products );
    const [ previewProducts, setPreviewProducts ] = useState([]);
    const [ offset, setOffset ] = useState(0);
    const [ toAddOnOffset, setToAddOnOffset ] = useState(0);
    const [ listener, setListener ] = useState(false);
    const [ displaying, setDisplaying ] = useState(true);
    const timeouts = useRef({
        displaying: null
    });

    const windowScrollListener = useCallback((e) => {
        if ( displaying || resetProductsOrder )
            return;

        let html = document.documentElement;        
        if ( html.scrollHeight - html.scrollTop - html.clientHeight < 350 ) {            
            setDisplaying(true);
            setOffset( offset + toAddOnOffset );
        }
    });

    useEffect(() => {
        if ( !showProducts || resetProductsOrder ) 
            return;

        let arr = [];
        let added = 0;
        let animationTime = 1000;
        let productBrand, productCategory;         
        let i;   
        console.log(offset, toAddOnOffset);
        for (i=offset; i < allProducts.length && added < previewLimit; i++) {
            
            // Make a distiction whether to include this particular product into display array
            productBrand = allProducts[i].brand;
            productCategory = allProducts[i].category;   
            console.log(activeFilters, filters);         
            if ( activeFilters.active > 0 ) {
                if ( activeFilters.brands > 0 && activeFilters.categories > 0 ) {                                      
                    if ( !filters.brands[productBrand] || !filters.categories[productCategory] )
                        continue;                    
                    console.log(productBrand, productCategory, filters.brands, filters.categories);
                } else if ( activeFilters.brands > 0 && activeFilters.categories === 0 ) {
                    if ( !filters.brands[productBrand] )
                        continue;
                } else if ( activeFilters.brands === 0 && activeFilters.categories > 0 ) {
                    if ( !filters.categories[productCategory] )
                        continue;
                }
            }

            arr.push({  
                product: allProducts[i],
                animationDelay: animationTime,
                animationDuration: animationDuration
            });
            animationTime += animationDelayIncrement;   
            added++;         
        }        
        setPreviewProducts([
            ...previewProducts,
            ...arr
        ]);  
        setToAddOnOffset(i - offset);                    
      
        window.clearTimeout(timeouts.current.displaying);
        timeouts.current.displaying = window.setTimeout(() => {
            setDisplaying(false);      
        }, animationTime + animationDelayIncrement);    

    }, [showProducts, offset]);

    useEffect(() => {        
        window.addEventListener("scroll", windowScrollListener);
        return () => {
            window.removeEventListener("scroll", windowScrollListener);
        };        
    }, [listener, displaying]);

    useEffect(() => {
        if ( offset >= allProducts.length )
            window.removeEventListener("scroll", windowScrollListener);
    }, [offset]);

    useEffect(() => {
        return () => {
            window.clearTimeout(timeouts.current.displaying);
        };
    }, []);

    useEffect(() => {
        if ( resetProductsOrder ) {
            setOffset(0);
            setPreviewProducts([]);            
        }
    }, [resetProductsOrder]);

    useEffect(() => {
        setPreviewProducts([]);
        setAllProducts(products);
        setOffset(0);
    }, [products]);
    
    return (
        <>        
            {previewProducts.map((product, index) => (
                <SingleProduct key={'index-' + index} singleProduct={product} index={index} columns={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4
                }} />                                                            
            ))}            
        </>
    );
}