/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */
var mongoose = require("mongoose");

mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost:27017/TodoApp"); // mongoose contains connection all time

var Todo = mongoose.model("Todo", {
    text: {type: String, required: true, minlength: 1, trim: true},
    completed: {type: Boolean, default: false},
    completedAt: {type: Number, default: null}
});

var newTodo = new Todo({
    text: "cook Dinner"
});

var user = mongoose.model("user", {
    email: {type: String, required: true, trim: true, minlength: 1}
});

var newUser = new user({email: "eng.ibrahim@hotmail.om"});

// save user to database.
newUser.save().then((doc) => {
    console.log(doc);
}, (e) => {
    console.log(e);
});

// save data to database.
newTodo.save().then((doc) => {
    console.log("saved todo " + doc);
}, (e) => {
    console.log("unable to saved todo " + e);
}); // save to mongodb

