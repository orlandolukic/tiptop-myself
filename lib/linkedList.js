
export function LinkedList() {
    
    let first = null;
    let last = null;
    let elems = 0;
    
    const Element = function(el) {
        return {
            element: el,
            next: null
        };
    };

    return {
        insertLast: function(el) {
            let e = Element(el);
            if ( first === null ) 
                first = last = e;
            else {
                last.next = e; 
                last = e;
            }
            elems++;
        },
        insertFirst: function(el) {
            let e = Element(el);
            if ( first === null ) 
                first = last = e;
            else {
                e.next = first;
                first = e;
            }
            elems++;
        },
        getFirst: function() {
            return first !== null ? first.element : null;
        },
        getLast: function() {
            return last !== null ? last.element : null;
        },
        removeFirst: function() {
            let e = first;
            if ( first !== null ) {
                first = first.next;
                elems--;
                return e.element;
            }
            return null;
        },
        removeLast: function() {
            let e;
            let curr = first;
            let prev = null;
            
            if ( curr === null )
                return;

            while( curr !== null && curr.next !== null ) {                
                prev = curr;
                curr = curr.next;
            };

            if ( prev === null ) {
                e = first;
                first = first.next;
                last = null;
                return null;
            } else {
                e = curr;
                prev.next = null;
                last = prev;
            };
            elems--;   
            return e.element;
        },
        getElementNumber: function() {            
            return elems;
        },
        toString: function() {
            let curr = first;
            let s = "";
            while( curr !== null ) {
                s += curr.element + "\n";
                curr = curr.next;
            }
            return s;
        }
        
    }
}