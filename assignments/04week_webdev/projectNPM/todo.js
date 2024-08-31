const { Command } = require('commander');
const fs = require('fs');
const program = new Command();
program
  .name('todos')
  .description('CLI to manage todos')
  .version('0.0.1');


program.command('show')
  .description('Lists down all todos with their ID')
  .action(() => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        if(err){
            console.log("Error")
            return;
        }
        data = JSON.parse(data).todos;
        for(let i = 0; i < data.length; i++){
            console.log("-----------------------");
            console.log('id = ' + data[i].id);
            console.log('todo = ' + data[i].todo);
            console.log('isDone = ' + data[i].isDone);
        }
        console.log("-----------------------");
    })
  });

program.command('add')
  .description('Add a new todo')
  .argument('<todo>', 'todo to be added')
  .action((todo) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        if(err){
            console.log("Error")
            return;
        }
        data = JSON.parse(data);
        data.count++;
        data.todos.push({
            "id": data.count,
            "todo": todo,
            "isDone": false
        })
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {});
    })
  });

program.command('delete')
  .description('Delete a todo by ID')
  .argument('<id>', 'id of todo to be deleted')
  .action((id) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        if(err){
            console.log("Error")
            return;
        }
        data = JSON.parse(data);
        let length = data.todos.length;
        for(let i = 0; i < length; i++){
            if(data.todos[i].id == id){
                data.todos.splice(i,1);
                break;
            }
        }
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {});
    })
  });

program.command('done')
  .description('Mark a todo as done using ID')
  .argument('<id>', 'id of todo to be marked as done')
  .action((id) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        if(err){
            console.log("Error")
            return;
        }
        data = JSON.parse(data);
        let length = data.todos.length;
        for(let i = 0; i < length; i++){
            if(data.todos[i].id == id){
                data.todos[i].isDone = true;
                break;
            }
        }
        data = JSON.stringify(data);
        fs.writeFile('todos.json', data, () => {});
    })
  });

program.command('clear')
  .description('clear all todos')
  .action(() => {
    fs.writeFile('todos.json', JSON.stringify({
        "count": 0,
        "todos":[]
    }), () => {})
  });

program.parse();