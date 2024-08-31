const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            return;
        }
        res.json(data);
    })
})

app.post('/', (req,res) => {
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            return;
        }
        let todo = req.body.todo;
        data = JSON.parse(data);
        data.count++;
        data.todos.push({"id": data.count, "todo": todo, "isDone": false});
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({"status": "done"});
        });
    })
})

app.delete('/', (req,res) => {
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            return;
        }
        const id = req.body.id;
        data = JSON.parse(data);
        let length = data.todos.length;
        for(let i = 0; i < length; i++){
            if(data.todos[i].id == id){
                data.todos.splice(i,1);
                break;
            }
        }
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({"status": "done"});
        });
    })
})

app.put('/', (req,res) => {
    fs.readFile('todos.json', 'utf-8', (err,data) => {
        if(err){
            return;
        }
        const id = req.body.id;
        data = JSON.parse(data);
        let length = data.todos.length;
        for(let i = 0; i < length; i++){
            if(data.todos[i].id == id){
                data.todos[i].isDone = true;
                break;
            }
        }
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {
            res.json({"status": "done"});
        });
    })
})

app.listen(3000);