const express = require("express");

const app = express();
const users = [];

app.use(express.json())

function generateNewToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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
        const token = generateNewToken();
        res.send({
            message: "login success",
            token: token
        })
        foundUser.token = token;
    }
    else{
        res.status(403).send({
            message: "Invalid user details"
        })
    }

})

app.post('/me',(req,res) => {
    const token = req.body.token;
    const foundUser = users.find((n) => n.token === token)
    if(foundUser){
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