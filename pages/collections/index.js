import Head from "next/head";
import { CollectionsLayout } from "components/layouts/collections-layout";
import s from "components/pages/collections/index.module.scss";
import { LeftHandSidePanel } from "components/pages/collections/leftHandSidePanel";
import { connectToDatabase } from "lib/mongodb";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "components/loader/loader";
import { Products } from "components/pages/collections/products";
import { LinkedList } from "lib/linkedList";
import { useStateWithLabel } from "lib/utils";

export default function CollectionPage({ products, categoriesList, brandsList, ...rest }) {

    const [ isLoading, setIsLoading ] = useState(true);  
    const [ showProducts, setShowProducts ] = useState(false);  
    const [ brands, setBrands ] = useStateWithLabel({}, "Brands");
    const [ categories, setCategories ] = useStateWithLabel({}, "Categories");
    const [ filterTimeout, setFilterTimeout ] = useStateWithLabel(null, "FilterTimeout");
    const [ resetProducts, setResetProducts ] = useStateWithLabel(false, "ResetProducts");
    const changeFilter = useCallback((type, name, value) => {
        setShowProducts(false);
        setIsLoading(true); 
        setResetProducts(true);  
        window.clearTimeout(filterTimeout);     

        if ( type === "category" ) {
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
                            Sort
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className={s['products-placeholder']}>
                            <Loader classNames={['color-primary']} isLoading={isLoading} styleContainer={{ position: "absolute", minHeight: "400px" }} positionLoader={{top: "150px"}} /> 
                            <div className="row mb-5">
                                <Products showProducts={showProducts} products={products} filters={{brands, categories}} resetProductsOrder={resetProducts} />
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
