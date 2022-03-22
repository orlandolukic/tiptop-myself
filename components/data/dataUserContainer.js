import { useEffect, useState } from "react";
import Layout from "../layouts/layout";


export function DataUserContainer(props) {

    let [ t, setT ] = useState(false);

    useEffect(() => {
        if ( t )
            return;

        setTimeout(() => {
            props.changeUser({
                username: "petar.petrovic",
                name: "Petar",
                surname: "Petrovic"
            });
        }, 3000);

        // Set handlers for login
        props.setHandlers({
            login: function() {
                console.log("login started");
                setTimeout(() => {
                    console.log("timeout over");
                    props.changeUser({
                        username: "petar.petrovic " +  + Math.random(),
                        name: "Petar",
                        surname: "Petrovic"
                    })
                }, 3000);
            }
        });

        setT(true);
    }, [t]);

    return (<></>);
}