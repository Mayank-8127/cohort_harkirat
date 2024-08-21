function func1(){
  let name = 'mayank';
  const age = 19;
  var isStudent = true;
  let favColor = 'blue';
  let height = 172;
  let likePizza = false;
  console.log(height + age, likePizza, favColor);
}

function sum(a,b){
  console.log(a+b);
}

function canVote(a){
  if(a >= 18){
    console.log('Can vote');
  }
  else{
    console.log('cant vote');
  }
}

function oddEven(a){
  if(a%2 == 0){
    console.log('Number is even');
  }
  else{
    console.log("Number is odd");
  }
}

function sumOfNumbers(a,b){
  let sum = 0;
  for(let i = a; i <= b; i++){
    sum += i;
  }
  console.log(sum);
}

let mayank = {
  rollno: '23bec026',
  age: 19,
  year: '2nd',
  friend: {
    name: '',
    city: 'jalandhar',
    college: '',
    height: 156
  }
}

let people = [{
  name: 'mayank',
  age: 18
  },{
    name: 'harkirat',
    age: 29
  },{
    name: 'golu',
    age: 10
}]

function voter(a){
  for( let i = 0; i < a.length; i++){
    if(a[i].age > 17){
      console.log(a[i].name);
    }
  }
}

voter(people);
