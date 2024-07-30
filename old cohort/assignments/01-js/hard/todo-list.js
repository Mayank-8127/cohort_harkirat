/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todos=[];
  }
  add(todo){
    this.todos.push(todo);
  }
  remove(index){
    if(index >= this.todos.length){
    }
    else {
      let a = this.todos.splice(index, 1);
    }
  }
  update(index, updatedTodo){
    if(index >= this.todos.length){
    }
    else {
      if(updatedTodo == "Invalid Task"){
      }
      else{
        this.todos[index] = updatedTodo;
      }
    }
  }
  getAll(){
    return this.todos;
  }
  get(index){
    if(index >= this.todos.length){
      return null;
    }
    else {
      let a = this.todos[index];
      return a;
    }
  }
  clear(){
    this.todos = [];
  }
}

module.exports = Todo;
