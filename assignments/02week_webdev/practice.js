function sum(a){
  let sum = 0;
  for(let i = 1; i <= a; i++ ){
    sum += i;
  }
  return sum;
}

function factorial(a){
  let x = 1;
  for( let i = 1; i < a; i++){
    x = x*i;
  }
  return x;
}

function doOperation(a, func){
  const value = func(a);
  console.log(value);
}

function callback(){
  setTimeout(() => {
    console.log('3 seconds gone');
  }, 3000);
  setTimeout(() => {
    console.log('1 second gone');
  }, 1000);
}

class Shape {
  constructor(color){
    this.color = color;
  }
  paint(){
    console.log(`Painting this shape ${this.color}.`);
  }
  area(){
    throw new Error("Error");
  }
  getDescription(){
    return(`A shape having color ${this.color}.`)
  }
}

class Circle extends Shape{
  constructor(radius, color){
    super(color);
    this.radius = radius;
  }

  area(){
    const area = this.radius * this.radius * Math.PI;
    return area;
  }
  getDescription(){
    return(`A circle with radius ${this.radius} and color ${this.color}.`)
  }
}

class Rectangle extends Shape{
  constructor(length,breadth,color){
    super(color);
    this.length = length;
    this.breadth = breadth;
    this.areaa = length*breadth;
  }
  area(){
    const area = this.breadth * this.length;
    return area;
  }
  getDescription(){
    return `A rectangle with length ${this.lenght} and breadth ${this.breadth} and color ${this.color}.`
  }
}

// const circle = new Circle(1000, 'blue')
// const area = circle.area();
// circle.paint();
// console.log(circle.getDescription());
// console.log(circle.radius)

function setTimeoutPromisifieddd(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solve() {
	await setTimeoutPromisifieddd(1000);
	console.log("hi");
	await setTimeoutPromisifieddd(3000);
	console.log("hello");
	await setTimeoutPromisifieddd(5000);
	console.log("hi there");
}

function setTimeoutPromisified(ms){
  return new Promise((resolve) => {
    setTimeout(resolve,ms);
  })
}

function fetchPromisified(link){
  return new Promise((res) => {
    fetch(link)
    .then((data) => res(data))
  })
}

//fetchPromisified('https://www.youtube.com').then((data) => console.log(data));

//const fs = require('fs');

function fsReadFilePromisified(filepath){
  return new Promise((resolve) => {
    fs.readFile(filepath, 'utf-8', (err,data) => {
      resolve(data);
    })
  })
}

//fsReadFilePromisified('/home/mayank/repos/web_development/02college_ranking/10data.txt').then((data) => console.log(data));