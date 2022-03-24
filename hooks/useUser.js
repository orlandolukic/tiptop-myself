import { createContext, useContext } from "react";

export const UserContext = createContext({  

    isLoggedIn: false,
    
    data: {
        username: null,        
        image: null,
        name: null,
        surname: null
    },

    operations: {
        login: (username, password) => {},
        isUserLoggedIn: () => {},
        getLoggedInUser: () => {}
    }   

});