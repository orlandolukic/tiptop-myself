
import { ClassManager } from '../../lib/utils';
import s from './loader.module.scss';

export function LoaderRing({style, classNames, variation, color, ...rest}) {
    
    let styles = {
        width: "80px",
        height: "80px",        
    };   
    
    let stylesDiv = {
        width: "64px",
        height: "64px",
        borderSize: "8px"
    };
    
    if ( !variation ) {
        // Merge styles 
        if ( style && style.div ) {        
            stylesDiv = { ...stylesDiv, ...style.div };        
        }    
        styles = { ...styles, ...style };  
    } else {
        switch(variation) {
        case "small":
            styles.width = "30px";
            styles.height = "30px";
            stylesDiv.width = "12px";
            stylesDiv.height = "12px";
            stylesDiv.margin = "10px";
            stylesDiv.borderWidth = "2px";            
            break;

        case "medium":
            styles.width = "40px";
            styles.height = "40px";
            stylesDiv.width = "20px";
            stylesDiv.height = "20px";
            stylesDiv.margin = "15px";
            stylesDiv.borderWidth = "4px";
            break;
        }
    }   

    return ( 
        <div className={ ClassManager().addClass( s['lds-ring'] ).addClassesWithRoot(s, classNames)
            .addClassWithRoot(s, color !== null ? "color-" + color : null).getClassName() } style={styles}>
            <div style={stylesDiv}></div>
            <div style={stylesDiv}></div>
            <div style={stylesDiv}></div>
            <div style={stylesDiv}></div>
        </div>
    );
}