console.log("Expected time taken: 1000ms");
function countDown () {
    let currentTime = new Date();
    let time = currentTime.getTime() - lastTime.getTime();
    console.log("Actual time taken: " + time + "ms");
}
let lastTime = new Date();
setTimeout(countDown,1 * 1000);