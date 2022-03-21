import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layouts/layout";

export default function CollectionPage(props) {
    return (
        <>
        <Head>
            <title>Collections | TipTop</title>
            <meta name="description" content="Buy only quality apparel" />      
        </Head>

        <div className="collection-page">
            Collection page here
        </div>

        <Link href="/">
            Pocetna stranica
        </Link>
        </>    
    );
}


CollectionPage.getLayout = function(page) {
    return (
        <Layout>
            {page}
        </Layout>
    );
}

export async function getServerSideProps() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000 + Math.random() * 600);
    })    
    return {
        props: {}
    }
}
