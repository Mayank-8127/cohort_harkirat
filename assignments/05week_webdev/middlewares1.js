const express = require("express")
const app = express();


// app.use(function(req, res, next) {
//     console.log("request received");
//     next();
// })

// app.get("/sum", function(req, res) {
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);

//     res.json({
//         ans: a + b
//     })
// });


// app.use(function(req, res, next) {
//     req.name = "harkirat"
//     next();
// })

// app.get("/sum", function(req, res) {
//     console.log(req.name);
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);

//     res.json({
//         ans: a + b
//     })
// });


// app.use(function(req, res, next) {
//     res.json({
//         message: "You are not allowed"
//     })
// })

// app.get("/sum", function(req, res) {
//     console.log(req.name);
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);

//     res.json({
//         ans: a + b
//     })
// });




// Middleware function
function logRequest(req, res, next) {
  console.log(`Request made to: ${req.url}`);
  next();
}

// Apply middleware to a specific route
app.get('/special', logRequest, (req, res) => {
  res.send('This route uses route-specific middleware!');
});

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


//app.listen(3000);