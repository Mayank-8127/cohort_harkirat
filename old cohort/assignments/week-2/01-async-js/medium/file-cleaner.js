const fs = require("fs");
fs.readFile("week-2/01-async-js/medium/a.txt", "utf-8", function(err,data){
    console.log(data);
    for(i = data.length - 1; i > 0; i--){
        if(data[i] == ' ' && data[i-1] == ' '){
            data = data.replace("  ", " ");
        }
    }
    console.log(data);
    fs.writeFile("week-2/01-async-js/medium/a.txt", data, function(err){})
});