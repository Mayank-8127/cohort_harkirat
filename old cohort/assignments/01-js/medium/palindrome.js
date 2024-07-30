/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

//Can be improved by making it compare only for alphabets instead of just excluding some symbols.
function isPalindrome(str) {
  let str1 = str.toLowerCase().split(" ").join('').split(",").join('').split(".").join('').split("?").join('').split("!").join('');
  for(i = 0; i < str1.length; i++){
    if(str1[i] == str1[str1.length - 1 - i]){
    }
    else{
      return false;
    }
  }
  return true;
}

module.exports = isPalindrome;
