import Layout from "../components/layouts/layout";
import Head from 'next/head';

export default function Cart() {
    return (
        <>
            <Head>
                <title>Cart | TipTop</title>
                <meta name="description" content="Your wishlist" />      
            </Head>
            Cart
        </>
    );
}

Cart.getLayout = (page) => {
    return (
        <>
            <Layout setMarginTop={true}>
                {page}
            </Layout>
        </>
    );
}