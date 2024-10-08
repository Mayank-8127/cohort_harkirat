const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TodoModel, UserModel } = require("./db");
const {auth, JWT_SECRET} = require("./auth")
const { z } = require("zod");

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    const myschema = z.object({
        email: z.string().min(5).max(200).email(),
        password: z.string().min(6).max(200),
        name: z.string().min(2).max(200)
    });

    const validation = myschema.safeParse({
        email: email,
        password: password,
        name: name
    });

    if(validation.success == false){
        res.json({
            message: "Invalid format"
        });
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
    }
    catch(e){
        res.json({
            message: "Error signing up"
        })
        return
    }


    res.json({
        message: "You are signed up"
    });
});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const myschema = z.object({
        email: z.string().min(5).max(200).email(),
        password: z.string().min(6).max(200),
    });

    const validation = myschema.safeParse({
        email: email,
        password: password,
    });

    if(validation.success == false){
        res.json({
            message: "Invalid format"
        });
        return;
    }

    let user;
    let match;
    try{
        user = await UserModel.findOne({
            email: email,
        });
    
        match = await bcrypt.compare(password, user.password);
    }
    catch(e){
        res.json({
            message: "Error signing in"
        })
        return
    }

    if(match){
        let token;
        try{
            token = jwt.sign({
                id: user._id
            }, JWT_SECRET);
        }
        catch(e){
            res.json({
                message: "Error signing in"
            })
            return
        }

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

    const myschema = z.string().max(10000).min(1);

    const validation = myschema.safeParse(todo);

    if(validation.success == false){
        res.send({
            message: "Invalid format"
        });
        return;
    }
    try{
        await TodoModel.create({
            title: todo,
            done: false,
            userId: userId
        });
    }
    catch(e){
        res.json({
            message: "Error adding todo"
        })
        return
    }

    res.send({
        message: "Todo added"
    })
});

app.put('/todo', auth, async (req, res) => {
    const todo = req.body.todo;
    const userId = req.userid;

    const myschema = z.string().max(10000).min(1);

    const validation = myschema.safeParse(todo);

    if(validation.success == false){
        res.send({
            message: "Invalid format"
        });
        return;
    }
    
    let update;
    try{
        update = await TodoModel.findOneAndUpdate(
            {
                title: todo,
                userId: userId,
                done: false
            },
            {
                done: true
            }
        );
        if(update == null){
            throw new Error;
        }
    }
    catch(e){
        res.json({
            message: "Error marking as done"
        })
        return
    }

    res.send({
        message: "Todo marked as done"
    })
});

app.get('/todo', auth, async (req, res) => {
    const userId = req.userid;
    let todos;
    
    try{
        todos = await TodoModel.find({
            userId: userId
        });
    }
    catch(e){
        res.json({
            message: "Error fetching todos"
        })
        return
    }

    if(!todos){
        res.send([]);
        return;
    }

    res.send(todos);
});

app.listen(3000);