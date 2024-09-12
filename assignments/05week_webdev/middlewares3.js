//Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

const express = require("express");
const app = express();

let count = 0;

app.use((req,res,next) => {
    count++;
    next();
})


app.get('/add', (req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = a + b;
    res.json({
        answer: c
    })
})

app.get('/subtract', (req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = a - b;
    res.json({
        answer: c
    })
})

app.get('/multiply', (req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = a * b;
    res.json({
        answer: c
    })
})

app.get('/divide', (req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = a / b;
    res.json({
        answer: c
    })
})

app.get('/count', (req,res) =>{
    res.json({
        "count": count
    })
})

app.listen(3000);