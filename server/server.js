/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */
var mongoose = require("mongoose");

mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost:27017/TodoApp"); // mongoose contains connection all time

var Todo = mongoose.model("Todo", {
    text: {type: String},
    completed: {type: Boolean},
    completedAt: {type: Number}
});

var newTodo = new Todo({
    text: "cook Dinner"
});

newTodo.save().then((doc) => {
    console.log("saved todo " + doc);
}, (e) => {
    console.log("unable to saved todo " + e);
}); // save to mongodb

