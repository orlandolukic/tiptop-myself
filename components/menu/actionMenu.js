import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ProductContext } from "../../hooks/useProduct";
import { ClassManager } from "../../lib/utils";
import style from './Menu.module.scss';


export function ActionMenu({ classes, slowLinkChange, path, icon, children, ...rest }) {
    
    let className = ClassManager(style['action-menu']);
    className.addClassesWithRoot(style, classes);
    className = className.getClassName();

    const c = useContext(ProductContext);
    let number;

    if ( !path ) {
        path = "";
        number = 0;
    } else {
        number = c[path].getTotalQuantity();
    }

    const styleForNumber = {
        "lessThan10": {
            padding: "3px 7px"
        },
        "greaterThan10": {
            padding: "3px 5px"
        }
    };    
    
    return (
        <>
            <div className={className} {...rest}>
                <div className={style['icon']} onClick={slowLinkChange.bind(null, '/' + path, 100 + Math.random() * 300) }>
                    <FontAwesomeIcon icon={icon} size="xl" />                    
                </div>
                {number > 0 &&
                <div 
                    className={[style['action-menu-number']].join(' ')} 
                    style={number < 10 ? styleForNumber.lessThan10 : styleForNumber.greaterThan10}
                    >{number}</div>
                }
                {children}
            </div>       
        </>
    );
}