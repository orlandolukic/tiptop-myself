
import { Obj } from ".";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    Obj.increments++;
    connectToDatabase().then((val) => {        
        setTimeout(async () => {
            
            res.status(200);
            try {
                const collection = val.db.collection("Users");
                let d;
                await collection.findOne().then((value) => { d = value });                
                res.json({name: "HELLO WORLD FROM HOME", increments: d.Email, db: null});        
            } catch(e) {
                
            };

        
        }, 2500);    
    });    
}