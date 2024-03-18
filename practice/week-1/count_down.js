let i = 30;
function countDown () {
    if (i >= 0) {
        console.log(i);
        i = i - 1;
    } else {
        clearInterval(intervalID);
    }
}

let intervalID = setInterval(countDown,1 * 1000);