console.log("Press ctrl + c to exit the counter");
setInterval(function(){
    let t = new Date();    
    let h = String(t.getHours()).padStart(2, '0');
    let m = String(t.getMinutes()).padStart(2, '0');
    let s = String(t.getSeconds()).padStart(2, '0');
    let hourFormat24 = h + ":" + m + ":" + s;
    let hourFormat12 = "";
    if(h > 12){
        hourFormat12 = String(h - 12).padStart(2, '0') + ":" + m + ":" + s + " PM";
    }
    else if(h < 12) {
        hourFormat12 = h + ":" + m + ":" + s + " AM";

    }else{
        hourFormat12 = h + ":" + m + ":" + s + " PM";
    }
    console.log(hourFormat24 + "   " + hourFormat12);
},1000)