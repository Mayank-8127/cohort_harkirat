const jwt = require("jsonwebtoken");
const JWT_SECRET = "vgygrihdjcnknjbfeioisk";
const { z } = require("zod");

function auth(req,res,next){
    const token = req.headers.token;
    const schema = z.string().min(1).max(5000);
    const match = schema.safeParse(token);
    if(match.success == false){
        res.status(403).json({
            message: "unauthorised request"
        });
        return
    }

    const user = jwt.verify(token, JWT_SECRET);

    if(user){
        req.userid = user.id;
        next()
    }else{
        res.status(403).send({
            message: "unauthorised request"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}