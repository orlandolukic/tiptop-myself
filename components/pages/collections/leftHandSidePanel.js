import { Checkbox, FormControlLabel } from "@mui/material";
import { useLayoutContext } from "hooks/useLayout";
import { createRef, Fragment, useEffect, useState } from "react";
import s from "./index.module.scss";


export function LeftHandSidePanel({ categories, brands, ...rest }) {

    const filtersRef = createRef(); 3
    const [ fixed, setIsFixed ] = useState(false);
    
    const layoutContext = useLayoutContext();    

    const scroll = (e) => {
        if ( document.documentElement.scrollTop > layoutContext.getMenuBarHeight() ) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => {
            window.removeEventListener("scroll", scroll);
        };
    });

    return (
        <div className={s["left-hand-side-panel"] + (fixed ? " " + s['is-fixed'] : null)} ref={filtersRef} style={{top: layoutContext.getMenuBarHeight() + 15}}>  

            <h3>Filters</h3>

            <div className="mt-4">
                <h6>Brands</h6>

                <div className="mt-2">
                    {brands.map((value, index) => (
                        <FormControlLabel key={'brand-' + index} sx={{
                            padding: "0px",
                            display: "block"                               
                        }} control={
                            <Checkbox sx={{padding: "2px 10px 2px 10px"}} />
                        } label={value.brandName} />
                    ))}                           
                    
                </div>


                <h6 className="mt-4">Category</h6>

                <div className="mt-2">
                    {categories.map((value, index) => (
                        <FormControlLabel key={'category-' + index} sx={{
                            padding: "0px",
                            display: "block"                               
                        }} control={
                            <Checkbox sx={{padding: "2px 10px 2px 10px"}} />
                        } label={value.categoryName} />
                    ))}                           
                    
                </div>
            </div>

        </div>
    );
}