/**
 * Created by Ibrahim Ayman on 16/06/2017.
 */
// local imports
var {mongoose} = require("./../server/db/mongoose");
var {Todo} = require("./../server/models/todo");
var {ObjectID} = require("mongodb");


var id = "59423ef9e3526031249d241b78";
// validate id before run the query.
if (!ObjectID.isValid(id)) {
    return console.log("Id not valid");
}


// select multible documents.
Todo.find({_id: id}).then((todos) => {
    console.log("todos: " + todos);
});

// select one document.
Todo.findOne({_id: id}).then((todo) => {
    console.log("todos: " + todo);
});

// select one document by Id.
Todo.findById({_id: id}).then((todo) => {
    if (!todo) {
        console.log("id not found");
    }
    console.log("todos: " + todo);
}).catch((e) => {
    console.log(e);
});