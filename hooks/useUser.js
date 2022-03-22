import { createContext, useContext } from "react";

export const UserContext = createContext({  

    data: {
        username: null,
        name: null,
        surname: null
    },
    

    // Functions to handle events for User
    operations: {
        login: function() {}
    }
});