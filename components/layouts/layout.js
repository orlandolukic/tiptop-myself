import React, { useEffect, useRef, useState, useContext } from "react";
import { Menu } from "../menu/menu";
import { DataUserContainer } from "../data/dataUserContainer";
import { UserContext } from "../../hooks/useUser";


export default function Layout(props) {
    
    //var marginTop = typeof props.marginTop !== typeof undefined ? props.marginTop : 67;    
    var [ marginTop, setMarginTop ] = useState(typeof props.marginTop !== typeof undefined ? props.marginTop : 67);  
    var ref = useRef( React.createRef() );
    var userContext = useContext(UserContext);
    let [ userDataObj, setUserDataObj ] = useState( userContext.data );
    let [ userOperationsObj, setUserOperationsObj ] = useState( userContext.operations );

    const changeUser = (newUserObj) => {        
        setUserDataObj(newUserObj);    
    }

    const getHandlers = (newHandlers) => {
        setUserOperationsObj(newHandlers);
    }

    useEffect(() => {
        //setMarginTop( menuComponent.clientHeight );
        //console.log(ref.current);        
    });

    return (
        <>            
            <UserContext.Provider value={{data: userDataObj, operations: userOperationsObj}}>
                <DataUserContainer changeUser={changeUser} setHandlers={getHandlers} />
                <Menu innerRef={ref} />
                <div style={{marginTop: marginTop + "px"}}>
                    {props.children}
                </div>
            </UserContext.Provider>            
        </>
    );
}