import { useEffect, useState } from "react";
import Layout from "../layouts/layout";


export function DataUserContainer(props) {

    let [ t, setT ] = useState(false);
    let [ data, setData ] = useState(null);

    useEffect(() => {
        if ( t )
            return;

        fetch("/api/home", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({a: 20, b: 30})
        })
            .then((resp) => resp.json())
            .then((data) => {
                setData(data);
                props.changeUser({
                    username: "petar.petrovic " + data.increments,
                    name: "Petar",
                    surname: "Petrovic"
                });
            })        

        // Set handlers for user operations
        props.setHandlers({
            login: function() {
                console.log("login started");
                fetch("/api/home", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({a: 20, b: 30})
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setData(data);
                        props.changeUser({
                            username: "petar.petrovic " + data.increments,
                            name: "Petar",
                            surname: "Petrovic"
                        });
                    })
            }
        });

        setT(true);
    }, [t]);

    return (<></>);
}