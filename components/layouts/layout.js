import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../menu/menu";


export default function Layout(props) {
    
    //var marginTop = typeof props.marginTop !== typeof undefined ? props.marginTop : 67;    
    var [ marginTop, setMarginTop ] = useState(typeof props.marginTop !== typeof undefined ? props.marginTop : 67);  
    var ref = useRef( React.createRef() );


    useEffect(() => {
        //setMarginTop( menuComponent.clientHeight );
        console.log(ref.current);        
    });

    return (
        <>
            <Menu innerRef={ref} />
            <div style={{marginTop: marginTop + "px"}}>
                {props.children}
            </div>
        </>
    );
}