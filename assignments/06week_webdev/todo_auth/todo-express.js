const express = require("express");
const jwt = require("jsonwebtoken")
const fs = require("fs");
const app = express();
const cors = require("cors")

app.use(cors());

const JWT_SECRET = "BEURHFNVIEURIjdnurhfirjfvfuhrhue"

app.use(express.json());

app.get('/',(req,res) => {
    res.sendFile('/home/mayank/repos/cohort_harkirat/assignments/06week_webdev/todo_auth/index.html')
})

app.post('/signup', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(200).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) =>{
        if(err){
            res.status(200).json({message:"Error in database"})
            return
        }
        data = JSON.parse(data);
        if(data[username]){
            res.status(200).json({message:"User already exists"})
        }else{
            data[username] = {};
            data[username].password = password;
            data[username].count = 0;
            data[username].todos = [];
            data = JSON.stringify(data);
            fs.writeFile('todos.json', data, () => {});
            res.status(200).json({message:"Signup Successful"})
        }
    })
})

app.post('/signin', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(200).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) =>{
        if(err){
            res.status(200).json({message:"Error in database"})
            return
        }
        data = JSON.parse(data);
        if(!data[username]){
            res.status(200).json({message:"User does not exist, Please signup first"})
        }else if(data[username].password != password){
            res.status(200).json({message:"Incorrect Password"})
        }else{
            const token = jwt.sign({username: username}, JWT_SECRET);
            res.status(200).json({
                message:"Signin Successful",
                token: token
            })
        }
    })
})

const auth = (req,res,next) => {
    const token = req.headers.token;
    if(!token){
        res.status(200).json({message: "Please signup or signin"})
        return;
    }
    let user = {};
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.status(200).json({message: "Please sign in again"})
        return
    }
    if(user.username){
        req.derivedname = user.username;
        next();
    }
    else{
        res.status(200).json({
            message: "Please sign in again"
        })
    }
}

app.get('/todos', auth, (req,res) => {
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(200).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        res.json({
            message: "Displaying todos",
            todos: data[req.derivedname].todos,
            username: req.derivedname
        });
    })
})

app.post('/addtodo', auth, (req,res) => {
    let todo = req.body.todo;
    if(!todo){
        res.status(200).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(200).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        data[req.derivedname].count++;
        data[req.derivedname].todos.push({"todo": todo, "isDone": false});
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({message: "Todo added"});
        });
    })
})

app.delete('/deletetodo', auth, (req,res) => {
    let id = parseInt(req.body.id);
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(200).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        if(id > data[req.derivedname].count || !id || id < 1){
            res.status(200).json({message: "Incorrect parameters"})
            return;
        }
        data[req.derivedname].count--;
        data[req.derivedname].todos.splice(id-1,1);
        res.json({message: "Deleted todo"})
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {});
        return;
    })
})

app.put('/markasdone', auth, (req,res) => {
    let id = parseInt(req.body.id);
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(200).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        if(id > data[req.derivedname].count || !id || id < 1){
            res.status(200).json({message: "Incorrect parameters"})
            return;
        }
        data[req.derivedname].todos[id-1].isDone = true;
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({message: "Todo marked as done"});
        });
    })
})

app.put('/edittodo', auth, (req,res) => {
    let id = parseInt(req.body.id);
    let todo = (req.body.todo);
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(200).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        if(id > data[req.derivedname].count || !id || id < 1 || !todo){
            res.status(200).json({message: "Incorrect parameters"})
            return;
        }
        data[req.derivedname].todos[id-1].todo = todo;
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({message: "Todo Edited"});
        });
    })
})

app.listen(3000);