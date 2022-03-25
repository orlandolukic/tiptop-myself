import { createContext, useContext, useState } from "react";

export const LayoutContext = createContext({
    refresh: () => {}
});

export function useLayoutContext() {
    let [ refresh, setRefresh ] = useState(0);
    let layoutContext = useContext(LayoutContext);
    layoutContext.refresh = () => {
        setRefresh(refresh+1);
    }
    return layoutContext;
}