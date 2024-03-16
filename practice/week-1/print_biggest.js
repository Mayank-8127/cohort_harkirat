let a = [3,234,-24,25,445,6,56,34,-25,436,64,32,5,564,-131,231];
let biggest = 0;
for (let i = 0; i < a.length; i++) {
    if (a[i] > biggest) {
        biggest = a[i];
    }
}
console.log("Biggest number in the array is: " + biggest);