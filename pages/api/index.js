
export let Obj = {
    increments: 0
};

export default function handler(req, res) {
    setTimeout(() => {
        Obj.increments++;
        res.status(200).json({name: "HELLO WORLD", increments: Obj.increments});
    }, 2500);    
}