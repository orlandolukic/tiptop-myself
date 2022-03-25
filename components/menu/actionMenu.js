import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ProductContext } from "../../hooks/useProduct";
import style from './Menu.module.scss';


export function ActionMenu({ classes, slowLinkChange, path, icon, children, ...rest }) {
    
    let className = style['action-menu'];

    if ( typeof classes === typeof [] )
        classes.map((value) => {  
            if ( !style[value] )
                return;
            className += " " + style[value];        
        }); 

    const c = useContext(ProductContext);
    let number;

    if ( !path ) {
        path = "";
        number = 0;
    } else {
        number = c[path].getNumberOfProducts();
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
            <div className={className}>
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