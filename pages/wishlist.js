import Layout from "../components/layouts/layout";
import Head from 'next/head';

export default function Wishlist() {
    return (
        <>
            <Head>
                <title>Wishlist | TipTop</title>
                <meta name="description" content="Your wishlist" />      
            </Head>
            Wishlist
        </>
    );
}

Wishlist.getLayout = (page) => {
    return (
        <>
            <Layout setMarginTop={true}>
                {page}
            </Layout>
        </>
    );
}