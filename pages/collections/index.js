import Head from "next/head";
import { CollectionsLayout } from "components/layouts/collections-layout";
import s from "components/pages/collections/index.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LeftHandSidePanel } from "components/pages/collections/leftHandSidePanel";
import { connectToDatabase } from "lib/mongodb";
import { Fragment } from "react";
import { SingleProduct } from "components/pages/collections/single-product/singleProduct";

export default function CollectionPage({ products, categories, brands, ...rest }) {

    return (
        <>
        <Head>
            <title>Collections | TipTop</title>
            <meta name="description" content="Buy only quality apparel" />      
        </Head>

        <div className="container pt-3">
            <div className="row">
                <div className="col-lg-2 d-none d-sm-block">
                    <LeftHandSidePanel categories={categories} brands={brands} {...rest} />
                </div>
                <div className="col-12 col-lg-10">
                    <div className={s['collections-title']}>
                        <div className={s['title']}>
                            <h3>Collections</h3>
                        </div>
                        <div className={s['sort']}>
                            Sort
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="row">
                            {products.map((product, index) => (
                                <SingleProduct key={'index-' + index} product={product} columns={{
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 4
                                }} />                                                            
                            ))}
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
            brands: brands,
            categories: categories
        }
    }
}
