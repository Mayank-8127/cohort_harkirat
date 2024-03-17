let i = 30;
function countDown () {
    console.log(i);
    i = i - 1;
}
for (j = 0; j < 31; j++) {
    setTimeout(countDown,1 * 1000);
}