function time(){
    let a = new Date();
    let b = a.getTime();
    let sec = parseInt((b / 1000) % 60);
    let min = parseInt(((b / 60000) + 30) % 60);
    let hour = parseInt(((b / 3600000) + 5) % 24);
    console.log(hour + ":" + min + ":" + sec);
}
let x = setInterval(time, 1000);
//ctrl + c to stop the clock in terminal