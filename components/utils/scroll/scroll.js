import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassManager } from "lib/utils";
import { useCallback, useEffect, useState } from "react";
import s from "./scroll.module.scss";


export function Scroll() {

    const [ visible, setVisible ] = useState(false);

    const scroll = useCallback(() => {
        if ( document.documentElement.scrollTop > 100 ) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    const onClick = useCallback((e) => {
        document.documentElement.scrollTop = 0;
    });

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => {
            window.removeEventListener("scroll", scroll);
        };
    }, []);

    return (
        <>
            <div className={ClassManager().addClass(s['scroll-placeholder']).addClassWithRoot(s, visible ? "visible" : null).getClassName()}
                onClick={onClick}
            >
                <div className={s['scroll-content']}>
                    <FontAwesomeIcon icon={faChevronUp} size="2x" />
                </div>
            </div>
        </>
    );
}