import { faBan, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassManager } from "lib/utils";
import { useEffect, useState, useRef, useCallback } from "react";
import { SingleProduct } from "./single-product/singleProduct";


export function Products({ products, showProducts, filters, activeFilters, resetProductsOrder, s }) {

    const previewLimit = 20;
    const animationDelayIncrement = 200;
    const animationDuration = 2500;

    const [ allProducts, setAllProducts ] = useState( products );
    const [ previewProducts, setPreviewProducts ] = useState([]);
    const [ offset, setOffset ] = useState(0);
    const [ toAddOnOffset, setToAddOnOffset ] = useState(0);
    const [ listener, setListener ] = useState(false);
    const [ displaying, setDisplaying ] = useState(true);
    const [ noProducts, setNoProducts ] = useState(false);
    const noProductsPlaceholder = useRef();
    const timeouts = useRef({
        displaying: null,
        noProducts: null
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
        for (i=offset; i < allProducts.length && added < previewLimit; i++) {
            
            // Make a distiction whether to include this particular product into display array
            productBrand = allProducts[i].brand;
            productCategory = allProducts[i].category;                       
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
        
        if ( added === 0 && previewProducts.length === 0 ) {
            setNoProducts(true);
            window.clearTimeout(timeouts.current.noProducts);
            timeouts.current.noProducts = window.setTimeout(() => {
                try {
                    noProductsPlaceholder.current.className += " " + s['shown'];
                } catch(e) {}
            }, 100);
        } else {
            window.clearTimeout(timeouts.current.noProducts);
        }
      
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
            window.clearTimeout(timeouts.current.noProducts);
        };
    }, []);

    useEffect(() => {
        if ( resetProductsOrder ) {
            setOffset(0);
            setPreviewProducts([]); 
            setNoProducts(false);                       
        }
    }, [resetProductsOrder]);

    useEffect(() => {
        setPreviewProducts([]);
        setAllProducts(products);
        setOffset(0); 
        setNoProducts(false);       
    }, [products]);

    useEffect(() => {          
        
    }, [previewProducts]);
    
    return (
        <>      
            {noProducts && 
                <>
                   <div className="col-12">
                        <div ref={noProductsPlaceholder} className={ClassManager().addClass(s['no-products-found-placeholder']).getClassName()}>
                            <div className={s['no-products-found-content']}>
                                <FontAwesomeIcon icon={faCircleExclamation} size="6x" /> 
                                <div className={s['title']}>Products not found</div>
                                <div className={s['subtitle']}>Try with different criteria</div>
                            </div>
                        </div>
                   </div>
                </>
            }              
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