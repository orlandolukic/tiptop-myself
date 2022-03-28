import { ClassManager } from "../../lib/utils";

function Button({color, className, children, icon, variant, size, ...rest}) {

    // Create clsases for root element
    var classes = "button-placeholder";    

    let classManager = ClassManager();
    classManager.addClass("button-placeholder");

    if ( color )
        classManager.addClass("color-" + color);
        
    if ( variant !== undefined && variant !== true ) 
        classManager.addClass("button-" + variant);

    if ( size !== undefined && size !== true ) 
        classManager.addClass("button-size-" + size);

    classManager.addClass(className);
    

    return (
        <div className={classManager.getClassName()} {...rest}>
            {icon && 
            <div className="icon">icon</div>
            }
            <div className="text">{children}</div>
        </div>
    );
}


export default Button;