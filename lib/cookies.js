import jwt from "jsonwebtoken";

const KEY = process.env.JWT_KEY;

export function getCryptedData( data, options ) {
    let x = jwt.sign(data, KEY, options);
    return x;
}

export function getDecryptedData( crypto ) {
    let x = jwt.verify(crypto, KEY);
    return x;
}