
function Button(props) {

    // Create clsases for root element
    var classes = "button-placeholder";
    if ( props.color )
        classes += " color-" + props.color;
    if ( props.className )
        classes += " " + props.className;

    return (
        <div className={classes}>
            {props.icon && 
            <div className="icon">icon</div>
            }
            <div className="text">{props.children}</div>
        </div>
    );
}


export default Button;