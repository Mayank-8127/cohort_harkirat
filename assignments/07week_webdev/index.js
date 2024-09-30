const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TodoModel, UserModel } = require("./db");
const {auth, JWT_SECRET} = require("./auth")

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });

    res.json({
        message: "You are signed up"
    });
});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    const match = await bcrypt.compare(password, user.password);

    if(match){
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }
    else{
        res.json({
            message: "Incorrect credentials"
        })
    }
});

app.post('/todo', auth, async (req, res) => {
    const todo = req.body.todo;
    const userId = req.userid;

    if(!todo){
        res.send({
            message: "Invalid format"
        });
        return;
    }

    await TodoModel.create({
        title: todo,
        done: false,
        userId: userId
    });

    res.send({
        message: "Todo added"
    })
});

app.put('/todo', auth, async (req, res) => {
    const todo = req.body.todo;
    const userId = req.userid;

    if(!todo){
        res.send({
            message: "Todo not found"
        });
        return;
    }
    
    await TodoModel.findOneAndUpdate({
        title: todo,
        userId: userId
    },
    {
        done: true
    }
);

    res.send({
        message: "Todo marked as done"
    })
});

app.get('/todo', auth, async (req, res) => {
    const userId = req.userid;
    const todos = await TodoModel.find({
        userId: userId
    });

    if(!todos){
        res.send([]);
        return;
    }

    res.send(todos);
});

app.listen(3000);