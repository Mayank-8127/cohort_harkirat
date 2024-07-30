let counter = 0;
console.log("Press ctrl + c to exit the counter");    
function delay(){    
    setTimeout(function(){
        counter += 1;
        console.log(counter);
        delay();
    },1000);
}
delay();