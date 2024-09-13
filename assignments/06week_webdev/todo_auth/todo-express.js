const express = require("express");
const jwt = require("jsonwebtoken")
const fs = require("fs");
const app = express();

const JWT_SECRET = "BEURHFNVIEURIjdnurhfirjfvfuhrhue"

app.use(express.json());

app.get('/',(req,res) => {
    res.sendFile('/home/mayank/repos/cohort_harkirat/assignments/06week_webdev/todo_auth/index.html')
})

app.post('/signup', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(400).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) =>{
        if(err){
            res.status(500).json({message:"Error in database"})
            return
        }
        data = JSON.parse(data);
        if(data[username]){
            res.status(403).json({message:"User already exists"})
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
        res.status(400).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) =>{
        if(err){
            res.status(500).json({message:"Error in database"})
            return
        }
        data = JSON.parse(data);
        if(!data[username]){
            res.status(403).json({message:"User does not exist, Please signup first"})
        }else if(data[username].password != password){
            res.status(403).json({message:"Incorrect Password"})
        }else{
            const token = jwt.sign({username: username}, JWT_SECRET);
            res.status(200).json({
                message:"success",
                token: token
            })
        }
    })
})

const auth = (req,res,next) => {
    const token = req.headers.token;
    let user = {};
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.status(403).json({message: "Please sign in again"})
        return
    }
    if(user.username){
        req.derivedname = user.username;
        next();
    }
    else{
        res.status(403).json({
            message: "Please sign in again"
        })
    }
}

app.get('/todo', auth, (req,res) => {
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(500).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        res.json({
            message: "Displaying todos",
            todos: data[req.derivedname].todos
        });
    })
})

app.post('/todo', auth, (req,res) => {
    let todo = req.body.todo;
    if(!todo){
        res.status(400).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(500).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        data[req.derivedname].count++;
        data[req.derivedname].todos.push({"id": data[req.derivedname].count, "todo": todo, "isDone": false});
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({message: "Todo added"});
        });
    })
})

app.delete('/todo', auth, (req,res) => {
    let id = req.body.id;
    if(!id){
        res.status(400).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(500).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        let length = data[req.derivedname].todos.length;
        for(let i = 0; i < length; i++){
            if(data[req.derivedname].todos[i].id == id){
                data[req.derivedname].todos.splice(i,1);
                res.json({message: "Deleted todo"})
                data = JSON.stringify(data);
                fs.writeFile('todos.json', data, () => {});
                return;
            }
        }
        res.status(400).json({message: "Deletion failed"})
    })
})

app.put('/todo', auth, (req,res) => {
    let id = req.body.id;
    if(!id){
        res.status(400).json({message: "Incorrect parameters"})
        return;
    }
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            res.status(500).json({message: "Error in database"})
            return;
        }
        data = JSON.parse(data);
        let length = data[req.derivedname].todos.length;
        for(let i = 0; i < length; i++){
            if(data[req.derivedname].todos[i].id == id){
                data[req.derivedname].todos[i].isDone = true;
                data = JSON.stringify(data);
                fs.writeFile('todos.json', data, () => {
                    res.json({message: "Todo marked as done"});
                });
                return;
            }
        }
        res.status(400).json({message: "Updation failed"})
    })
})

app.listen(3000);