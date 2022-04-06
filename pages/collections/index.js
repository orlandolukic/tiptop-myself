import Head from "next/head";
import { CollectionsLayout } from "components/layouts/collections-layout";
import s from "components/pages/collections/index.module.scss";
import { LeftHandSidePanel } from "components/pages/collections/leftHandSidePanel";
import { connectToDatabase } from "lib/mongodb";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "components/loader/loader";
import { Products } from "components/pages/collections/products";
import { shallowCopy, useStateWithLabel } from "lib/utils";
import { useCurrencyContext } from "hooks/useCurrency";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CollectionPage({ products, categoriesList, brandsList, ...rest }) {

    const currencyContext = useCurrencyContext();
    const [ fetchedProducts ] = useStateWithLabel(products, "Fetched Products");
    const [ preparedProducts, setPreparedProducts ] = useStateWithLabel(products, "Prepared Products");
    const [ isLoading, setIsLoading ] = useState(true);  
    const [ showProducts, setShowProducts ] = useState(false);
    const [ brands, setBrands ] = useStateWithLabel({}, "Brands");
    const [ categories, setCategories ] = useStateWithLabel({}, "Categories");
    const [ filterTimeout, setFilterTimeout ] = useStateWithLabel(null, "FilterTimeout");
    const [ resetProducts, setResetProducts ] = useStateWithLabel(false, "ResetProducts");
    const [ sort, setSort ] = useStateWithLabel(0, "Sort");
    const [ activeFilters, setActiveFilters ] = useStateWithLabel({
        active: 0,
        brands: 0,
        categories: 0
    }, "Active Filters");
    const currenctContext = useCurrencyContext();

    const changeFilter = useCallback((type, name, value) => {
        setShowProducts(false);
        setIsLoading(true); 
        setResetProducts(true);  
        window.clearTimeout(filterTimeout);   
        
        if ( !value ) {
            setActiveFilters({
                ...activeFilters,
                active: activeFilters.active - 1,
                [type]: activeFilters[type] - 1
            });
        } else {
            setActiveFilters({
                ...activeFilters,
                active: activeFilters.active + 1,
                [type]: activeFilters[type] + 1
            });
        }

        if ( type === "categories" ) {
            setCategories({
                ...categories,
                [name]: value
            });
        } else {
            setBrands({
                ...brands,
                [name]: value
            });
        }

        setFilterTimeout(window.setTimeout(() => {            
            setResetProducts(false);
            setIsLoading(false);
            setShowProducts(true);
        }, 650));        
    });

    const changeSortCallback = useCallback((event) => {
        changeSort(event.target.value);
    });
    const changeSort = useCallback((sortOption) => {
        setSort(sortOption);
        setShowProducts(false);
        setIsLoading(true); 
        setResetProducts(true);  
        window.clearTimeout(filterTimeout);     

        // Prepare products
        let arr = shallowCopy(fetchedProducts);
        if ( sortOption !== 0 ) {
            for (let i=0; i<arr.length-1; i++)
                for (let j=i+1; j<arr.length; j++) {
                    let res = currencyContext.sortProducts(arr[i], arr[j]);                    
                    let cond = false;
                    switch( sortOption ) {
                        // Descending sort
                    case -1:
                        cond = res < 0;
                        break;
                    default:
                        cond = res > 0;
                        break;
                    }
                    if ( cond ) {
                        let x = arr[i];
                        arr[i] = arr[j];
                        arr[j] = x;
                    }                
                }
        }
        setPreparedProducts(arr); 
        //console.log("fetched array", fetchedProducts);
        //console.log("sorted", arr);

        setFilterTimeout(window.setTimeout(() => {            
            setResetProducts(false);
            setIsLoading(false);
            setShowProducts(true);
        }, 650));        
    });

    useEffect(() => {
        if ( resetProducts )
            return;
        if ( isLoading ) {
            let t = 150 + Math.random() * 250;
            setTimeout(() => {
                setShowProducts(true);
            }, t);
            setTimeout(() => {
                setIsLoading(false);
            }, t + 450);
        }
    }, [isLoading]);

    useEffect(() => {
        if ( sort !== 0 ) {
            changeSort(sort);
        }
    }, [currenctContext.getCurrency()]);

    useEffect(() => {  
        setTimeout(() => {
            window.scrollTo(0,0);      
        }, 1000); 
        
        // Create filter objects
        brandsList.forEach((value) => {
            brands[value.brandName] = false;
        });
        categoriesList.forEach((value) => {
            categories[value.categoryName] = false;
        });
        return () => {
            currencyContext.clearPendingTasks();
            if ( filterTimeout !== null )
                window.clearTimeout(filterTimeout);
        }
    }, []);

    return (
        <>
        <Head>
            <title>Collections | TipTop</title>
            <meta name="description" content="Buy only quality apparel" />      
        </Head>

        <div className="container pt-3">
            <div className="row">
                <div className="col-lg-2 d-none d-sm-block">
                    <LeftHandSidePanel categories={categoriesList} brands={brandsList} changeFilter={changeFilter} {...rest} />
                </div>
                <div className="col-12 col-lg-10">
                    <div className={s['collections-title']}>
                        <div className={s['title']}>
                            <div>
                                <h3 style={{marginBottom: "3px"}}>Collections</h3>                                                                                    
                                <h6>Buy something your 🧡 desires the most</h6>
                            </div>                            
                        </div>
                        <div className={s['sort']}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                <InputLabel id="demo-simple-select-standard-label">Sort data by</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={sort}   
                                onChange={changeSortCallback}                             
                                label="Sort"                                
                                >                                       
                                    <MenuItem value={0}>Default</MenuItem>
                                    <MenuItem value={-1}><span className="fw-bold">Price:</span> High to low</MenuItem>
                                    <MenuItem value={1}><span className="fw-bold">Price:</span> Low to high</MenuItem>                                    
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className={s['products-placeholder']}>
                            <Loader classNames={['color-primary']} isLoading={isLoading} styleContainer={{ position: "absolute", minHeight: "400px" }} positionLoader={{top: "150px"}} /> 
                            <div className="row mb-5">
                                <Products 
                                    showProducts={showProducts} 
                                    products={preparedProducts} 
                                    filters={{brands, categories}} 
                                    activeFilters={activeFilters}
                                    resetProductsOrder={resetProducts}                                    
                                />
                            </div>                        
                        </div>                        
                    </div>                    
                </div>
            </div>
        </div>         
        </>    
    );
}


CollectionPage.getLayout = CollectionsLayout;

export async function getServerSideProps() {
    
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 500 + Math.random() * 600);
    })    

    let db = (await connectToDatabase()).db;    
    let collection = await db.collection("apparel");
    let cursor = await collection.find( null, {
        projection: { _id: 0 }
    });
    var arr = [];
    await cursor.forEach((v) => {        
        arr.push(v);               
    });    

    var brands = [];
    collection = await db.collection("brands");
    cursor = await collection.find( null, {
        projection: { _id: 0 }
    });
    await cursor.forEach((v) => {
        brands.push(v);
    });

    var categories = [];
    collection = await db.collection("categories");
    cursor = await collection.find( null, {
        projection: { _id: 0 }
    });
    await cursor.forEach((v) => {
        categories.push(v);
    });

    return {
        props: {
            products: arr,
            brandsList: brands,
            categoriesList: categories
        }
    }
}
