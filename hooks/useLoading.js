import { createContext } from "react";


export const LoadingContext = createContext({    
    endLoading: () => {},
    startLoading: () => {}
});