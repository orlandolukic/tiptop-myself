

export const ImageUtils = {
    getProductImageRoot: () => "/assets/product-images"
}

export function ClassManager(clss) {

    let x = {
        classes: [],
        addClass: function(s) {
            if ( s === "" )
                return this;
            this.classes.push(s);
            return this;
        },
        addClasses: function(classes) {
            if ( typeof classes === typeof [] )
                classes.forEach(element => {
                    if ( element === null )
                        return;
                    this.classes.push(element);
                });
            else if ( typeof classes === typeof "" )
                return this.addClass(classes);
            return this;
        },
        addClassesWithRoot: function(rootStyle, classes) {
            if ( typeof classes === typeof [] )
                classes.forEach(element => {
                    if ( element === null || element === "" )
                        return;
                    this.classes.push( rootStyle[element] );
                });
            else if ( typeof classes === typeof "" )
                return this.addClass( rootStyle[classes] );
            return this;
        },
        removeClass: function(className) {
            this.classes = this.classes.filter((value, index, arr) => {
                return value !== className;
            });   
            return this;     
        },
        getClassName: function() {
            return this.classes.join(' ');
        }
    };

    if ( typeof clss !== typeof undefined )
        x.addClass(clss);

    return x;
}