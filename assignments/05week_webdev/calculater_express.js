const express = require("express");

const app = express();
app.use(express.json());
app.post('/add', (req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const c = a + b;
    res.json({
        answer: c
    })
})

app.post('/subtract', (req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const c = a - b;
    res.json({
        answer: c
    })
})

app.post('/multiply', (req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const c = a * b;
    res.json({
        answer: c
    })
})

app.post('/divide', (req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const c = a / b;
    res.json({
        answer: c
    })
})

app.listen(3000);