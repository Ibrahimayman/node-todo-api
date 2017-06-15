//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // this line is identical to the obove code.

MongoClient.connect("mongodb://localhost:27017/TodoApp", function (err, db) {
    if (err) {
        return console.log("unable to connect mongo bd server");
    }
    console.log("connected mongo bd server");

    // delete many ----------
    // db.collection("todos").deleteMany({"text": "do the homework"}).then((result) => {
    //     console.log(result);
    // });

    // delete one : delete first item that matches the cartira.  ----------
    // db.collection("todos").deleteOne({"text": "Tasks"}).then((result) => {
    //     console.log(result);
    // });


    //find one and delete  ----------
    // db.collection("todos").findOneAndDelete({"text": "Tasks"}).then((result) => {
    //     console.log(result);
    // });


    db.collection("users").findOneAndDelete({"_id": new ObjectID("5942b4524d768c518e961e4c")}).then((result) => {
        console.log(result);
    });


    db.close();
});

