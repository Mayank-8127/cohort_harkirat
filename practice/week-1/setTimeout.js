let i = 0;
let lastTime = new Date();
function countDown () {
    if (i <= 10) {
        let currentTime = new Date();
        console.log(i);
        i = i + 1;
        let time = currentTime.getTime() - lastTime.getTime();
        console.log("Time taken: " + time + "ms");
        lastTime = new Date();
    } else {
        clearInterval(intervalID);
    }
}

let intervalID = setInterval(countDown,1 * 1000);
