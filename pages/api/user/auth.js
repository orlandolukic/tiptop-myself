import { connectToDatabase } from "../../../lib/mongodb";
const jwt = require('jsonwebtoken');
const KEY = process.env.JWT_KEY;

export default async function Auth(req, res) {
    
    let response = {
        isValid: false
    };    
    let data = req.body;  
    
    let decoded = jwt.verify(data, KEY);        
    console.log(decoded);
    /*
    try {       
        let db = (await connectToDatabase()).db;    
        let collection = await db.collection("Users");
        let row = await collection.findOne({
            Username: data.username,
            Password: decodedPassword
        });   
        
        if ( row.nonce ) {
            response.status = "already-logged-in";
            res.status(200).json(response);
            return;
        }

        response.user = {
            username: row.Username,
            name: row.Name,
            surname: row.Surname,
            image: row.Image            
        };
        let nonce = Math.floor( Math.random() * 90000 );
        response.nonce = jwt.sign( nonce, KEY );
        response.status = row ? "found" : "not-found";

        // Set nonce into database.        
        let x = await collection.updateOne({
            Username: row.Username
        }, {
            $set: { nonce: nonce }
        });        
        
    } catch(e) {        
        response.status = "not-found";
        response.reason = e;
    }
    */
    res.status(200).json(response);
}