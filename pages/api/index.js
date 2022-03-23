
export default function handler(req, res) {
    setTimeout(() => {
        res.status(200).json({name: "HELLO WORLD"});
    }, 2500);    
}