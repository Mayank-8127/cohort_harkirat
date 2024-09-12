//Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    const date = new Date();
    const time = date.toISOString();
    console.log(time);
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

app.listen(3000);