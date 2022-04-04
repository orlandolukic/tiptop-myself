import Layout from "components/layouts/layout";
import { Breadcrumbs } from "components/utils/breadcrumbs/breadcrumbs";
import { connectToDatabase } from "lib/mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function SingleBookPage({ product }) {

    const router = useRouter();
    useEffect(() => {
        
    });

    return (
        <>
            <Head>
                <title>{product.name} | TipTop</title>
            </Head>
            sdsd
        </>
    );
}

SingleBookPage.getLayout = function(page) {    
    return (
        <Layout setMarginTop showCurrency>
            <Breadcrumbs path={[
                {name: "Collections", url: "/collections", canNavigate: true},
                {name: page.props.children[0].props.product.name, url: "#", canNavigate: false}
            ]} />
            {page}
        </Layout>
    );
};

export async function getServerSideProps(req) {

    let id = typeof req.query["book-id"] !== typeof udefined ? req.query["book-id"] : -1;    
    let p = null;

    if ( id > -1 ) {
        try {
            let db = (await connectToDatabase()).db;    
            let collection = await db.collection("apparel");
            p = await collection.findOne( {
                id: Number.parseInt(id)
            }, {
                projection: { _id: 0 }
            });  
        } catch(e) {}                    
    }

    return {
        props: {
            product: p
        }        
    };
}