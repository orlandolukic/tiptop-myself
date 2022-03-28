
import { ClassManager } from '../../lib/utils';
import s from './loader.module.scss';

export function LoaderRing({style, classNames, ...rest}) {
    
    let styles = {
        width: "80px",
        height: "80px",
        div: {
            width: "64px",
            height: "64px",
            borderSize: "8px"
        }
    };    

    let stylesMerged = {...styles, ...style };
    if ( style && style.div ) {
        stylesMerged.div = { ...style.div, ...stylesMerged.div };
    }

    return ( 
        <div className={ ClassManager().addClass( s['lds-ring'] ).addClassesWithRoot(s, classNames).getClassName() } style={stylesMerged}>
            <div style={stylesMerged.div}></div>
            <div style={stylesMerged.div}></div>
            <div style={stylesMerged.div}></div>
            <div style={stylesMerged.div}></div>
        </div>
    );
}