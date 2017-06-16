// local imports
var {mongoose} = require("./../server/db/mongoose");
var {Todo} = require("./../server/models/todo");

var {ObjectID} = require("mongodb");

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove('5942eed4acbcfb29cc005b4b').then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove({_id: '5942eed4acbcfb29cc005b4b'}).then((todo) => {
    console.log(todo);
});