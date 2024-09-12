const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "DJMAYANK";
const app = express();
const users = [];

app.use(express.json())


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

app.get('/me',(req,res) => {
    const token = req.headers.token;
    const user = jwt.verify(token, JWT_SECRET);

    if(user){
        const foundUser = users.find((n) => n.username === user.username);
        res.send({
            message: "User found",
            username: foundUser.username,
            password: foundUser.password
        })
    }
    else{
        res.status(403).send({
            message: "User not found"
        })
    }
})

app.listen(3000);