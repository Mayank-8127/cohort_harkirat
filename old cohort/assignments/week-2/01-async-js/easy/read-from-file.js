const fs = require("fs");
fs.readFile("a.txt", "utf-8", function(err,data){
    console.log("3-inside readfile but before log data");
    console.log(data);
    console.log("4- inside readfile after logging data");
});

console.log("1- below readfile still executed before");
if(true){
    console.log("2- below 1 still executed before readfile");
}