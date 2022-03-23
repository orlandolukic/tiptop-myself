import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
const jwt = require('jsonwebtoken');
import { Cookie } from 'js-cookie';
import { useRouter } from "next/router";

const KEY = process.env.JWT_KEY;

export function DataUserContainer(props) {

    let [ t, setT ] = useState(false);
    let [ data, setData ] = useState(null);
    let [ nonce, setNonce ] = useState(-1);
    const router = useRouter();

    useEffect(() => {
        if ( t )
            return;

        // Check if user is already logged in
        let cookie = Cookies.get("token");        
        if ( cookie ) {

            cookie = JSON.parse(cookie);            

            let sendObj = jwt.sign({
                username: cookie.username,                
                nonce: nonce
            }, KEY);

            fetch("/api/user/auth", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(sendObj)
            })
            .then((resp) => resp.json())
            .then((resp) => {
                // User is not authenticated for app usage
                if (!resp.isValid) {
                    router.push('/');
                    //Cookies.remove('token');
                }                
            }) 
        };       

        // Set handlers for user operations
        props.setHandlers({
            login: async function(username, password) { 

                // Create signature of the given password
                password = jwt.sign(password, KEY);                

                fetch("/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({username: username, password: password})
                })
                .then((resp) => resp.json())
                .then((data) => {
                    if ( data.status === "found" ) {
                        setData(data.user);                        
                        props.changeUser(data.user);                                           
                        
                        // Create session cookie                        
                        Cookies.set('token', JSON.stringify(data.user));               
                    };
                })
            }
        });

        setT(true);
    }, [t]);

    return (<></>);
}