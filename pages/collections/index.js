import Link from "next/link";

export default function CollectionPage(props) {
    return (
        <>
            <div className="collection-page">
                Collection page here
            </div>

            <Link href="/">
                Pocetna stranica
            </Link>
        </>    
    );
}

export async function getServerSideProps() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 2500);
    })    
    return {
        props: {}
    }
}