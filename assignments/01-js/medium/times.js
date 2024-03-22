/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
    let time1 = new Date();
    let a = time1.getTime();
    let sum = 0;
    for(i = 1; i <= n; i++){
        sum += i;
    }
    let time2 = new Date();
    let b = time2.getTime();
    console.log("Sum from 1-" + n + " is: " + sum);
    console.log("Time taken to calculate sum from 1-" + n + " is: " + (b-a) + "ms");
    return 0.01;
}
calculateTime(100);
calculateTime(100000);
calculateTime(1000000000);
calculateTime(10000000000);
//values shown for larger sums is not accurate as it is beyond the limit of the variables.