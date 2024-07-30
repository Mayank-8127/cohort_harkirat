let counter = 0;
console.log("Press ctrl + c to exit the counter");
setInterval(function(){
    counter += 1;
    console.log(counter);
},1000)