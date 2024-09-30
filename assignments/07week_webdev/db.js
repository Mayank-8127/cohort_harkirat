const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://mayank8127:mayank81272k05@cluster0.ug4xa.mongodb.net/todo-app-1")


const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    name: String
});

const Todo = new Schema({
    title: {type: String, unique: true},
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = ({
    UserModel: UserModel,
    TodoModel: TodoModel
})