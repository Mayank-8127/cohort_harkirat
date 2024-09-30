const jwt = require("jsonwebtoken");
const JWT_SECRET = "vgygrihdjcnknjbfeioisk";

function auth(req,res,next){
    const token = req.headers.token;
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