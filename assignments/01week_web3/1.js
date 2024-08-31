const crypto = require('crypto');
let hash = '1';
let input = 0;
const prefix = 'Mayank'
while(true){
    input++;
    let input_s = prefix + input.toString();
    hash = crypto.createHash('sha256').update(input_s).digest('hex');
    if(hash.startsWith('00000')){
        break;
    }
}
console.log(hash)
console.log(input) 