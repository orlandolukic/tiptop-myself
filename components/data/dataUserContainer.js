import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import Layout from "../layouts/layout";
const jwt = require('jsonwebtoken');
import { Cookie } from 'js-cookie';
import { useRouter } from "next/router";
import { getCryptedData, getDecryptedData } from '../../lib/cookies';
import { UserContext } from "../../hooks/useUser";

export function DataUserContainer(props) {

    let context = useContext(UserContext);
    let [ t, setT ] = useState(false);
    let [ data, setData ] = useState( context.data );
    let [ isLoggedIn, setIsLoggedIn ] = useState( context.isLoggedIn );
    
    const router = useRouter();

    useEffect(() => {
         
        // Set handlers for user operations
        props.handlers.setHandlers({
            
            isUserLoggedIn: () => {                 
                return isLoggedIn;
            },

            getLoggedInUser: function() {                
                return data;
            },

            login: async function(username, password) { 

                if ( data.username === username ) {
                    console.log("already logged in!");
                    return;
                }

                // Create signature of the given password
                password = getCryptedData(password);                

                await fetch("/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({username: username, password: password})
                })                
                .then((resp) => {
                    data = resp.json();
                    if ( data.status === "found" ) {
                        setData(data.user);  
                        setIsLoggedIn(true);                                                                                                        
                        
                        // Create session cookie                        
                        Cookies.set('token', getCryptedData(JSON.stringify(data.user)), {                       
                            path: "/"
                        });               
                    } else {
                        setData(null);
                        setIsLoggedIn(false);
                        props.handlers.userNotFoundFallback();
                    }
                })
            }
        }); 
        props.handlers.changeUser(data);   
        props.handlers.setLoggedIn(isLoggedIn);   

    }, [data, isLoggedIn]);

    useEffect(() => {
        if ( t )
            return;

        // Check if user is already logged in
        let cookie = Cookies.get("token");        
        if ( !cookie ) {
            
        } else {
            let d = Cookies.get('token');
            d = getDecryptedData(d);
            setData(d); 
            setIsLoggedIn(true);                     
        }    

        setT(true);
    }, [t]);

    return (<></>);
}