import { Breadcrumbs } from "components/utils/breadcrumbs/breadcrumbs";
import { Children } from "react";
import Layout from "./layout";

export function CollectionsLayout(page) {    
    return (
        <Layout setMarginTop={true}>
            <Breadcrumbs path={[
                {name: "Collections", url: "/collections", canNavigate: true}
            ]} />
            {page}   
        </Layout>
    );
}
