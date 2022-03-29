import { createContext, useContext, useState } from "react";

export const LayoutContext = createContext({
    refresh: () => {},
    getMenuBarHeight: () => {}
});

export function useLayoutContextRoot(menuBarHeight) {
    let [ refresh, setRefresh ] = useState(0);    
    let layoutContext = useContext(LayoutContext);
    layoutContext.refresh = () => {
        setRefresh(refresh+1);
    }
    layoutContext.getMenuBarHeight = () => {
        return menuBarHeight;
    }
    return layoutContext;
}

export function useLayoutContext() {
    return useContext(LayoutContext);
}