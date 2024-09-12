const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "DJMAYANK";
const app = express();
const users = [];

app.use(express.json())

app.get('/',(req,res) => {
    res.sendFile('/home/mayank/repos/cohort_harkirat/assignments/06week_webdev/public/index.html')
})

app.post('/signup', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    });
    res.send("Signed up sucessfully");
})

app.post('/signin', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = users.find((n) => n.username === username && n.password === password)
    if(foundUser){
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        res.send({
            message: "login success",
            token: token
        })
    }
    else{
        res.status(403).send({
            message: "Invalid user details"
        })
    }

})

function auth(req,res,next){
    const token = req.headers.token;
    const user = jwt.verify(token,JWT_SECRET);
    if(user){
        req.derivedname = user.username;
        next();
    }
    else{
        res.status(403).send({
            message: "User not found"
        })
    }
}

app.get('/me', auth, (req,res) => {
    const foundUser = users.find((n) => n.username === req.derivedname);
    res.send({
        message: "User found",
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000);