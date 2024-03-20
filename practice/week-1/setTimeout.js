let i = 10;
function countDown () {
    if (i >= 0) {
        const currentDate = new Date();
        console.log(i);
        i = i - 1;
        console.log(currentDate.getTime());
    } else {
        clearInterval(intervalID);
    }
}

let intervalID = setInterval(countDown,1 * 1000);
