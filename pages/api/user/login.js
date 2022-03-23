import { connectToDatabase } from "../../../lib/mongodb";
const jwt = require('jsonwebtoken');
const KEY = process.env.JWT_KEY;

export default async function LoginUser(req, res) {
    
    let response = {
        status: "not-found"
    };    
    let data = req.body;  

    console.log(req);
    
    try {
        let decodedPassword = jwt.verify(data.password, KEY);        
        let db = (await connectToDatabase()).db;    
        let collection = await db.collection("Users");
        let row = await collection.findOne({
            Username: data.username,
            Password: decodedPassword
        });   

        response.user = {
            username: row.Username,
            name: row.Name,
            surname: row.Surname,
            image: row.Image            
        };
        response.status = row ? "found" : "not-found";      
        
    } catch(e) {        
        response.status = "not-found";
        response.reason = e;
    }
    
    res.status(200).json(response);
}