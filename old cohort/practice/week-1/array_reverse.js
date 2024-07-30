let a = [1,2,3,4,5,6];
let x = 0;
let y = a.length - 1;
for (i = 0; i < a.length/2; i++) {
    x = a[i];
    a[i] = a[y];
    a[y] = x;
    y--;
    x++;
}
console.log(a);