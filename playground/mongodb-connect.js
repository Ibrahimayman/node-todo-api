//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // this line is identical to the obove code.
var obj = new ObjectID();
console.log(obj);

var user = {name: "ibrahim", age: 23};
var {name} = user; //destruction assassinment javascript object
console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp", function (err, db) {
    if (err) {
        return console.log("unable to connect mongo bd server");
    }
    console.log("connected mongo bd server");
    // insert new doc in todos collection
    // db.collection('todos').insertOne({
    //     text: "some thing to do",
    //     completed: false
    // }, function (err, result) {
    //     if (err) {
    //         return console.log("unable to insert document", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //insert new doc in users collection(name,age,location)
    // db.collection('users').insertOne({
    //     name: "ibrahim ayman",
    //     age: 23,
    //     location : "Egypt"
    // }, function (err, result) {
    //     if (err) {
    //         return console.log("unable to insert document", err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id, undefined, 2));
    // });

    db.close();
});

