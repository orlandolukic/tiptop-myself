import { LinkedList } from "lib/linkedList";

export function Mutex() { 

    let waitingQueue = LinkedList();
    let permits = 1;

    return {        
        acquire: async function () {
            if ( permits <= 0 ) {                
                await new Promise((resolve) => {
                    let request = {                  
                        resolvePromise: resolve
                    }
                    waitingQueue.insertLast(request);                    
                });                                  
            } else {
                permits--;
            }            
        },
        release: () => {            
            if ( permits <= 0 ) {
                let elem = waitingQueue.removeFirst();
                if ( waitingQueue.getElementNumber() === 0 )
                    permits++;                
                if ( elem )
                    elem.resolvePromise();                                                
            };           
        },
        getBlockedRequests: function() { return waitingQueue.getElementNumber(); }
    };
}