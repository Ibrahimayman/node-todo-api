//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // this line is identical to the obove code.

MongoClient.connect("mongodb://localhost:27017/TodoApp", function (err, db) {
    if (err) {
        return console.log("unable to connect mongo bd server");
    }
    console.log("connected mongo bd server");

    // db.collection("todos").findOneAndUpdate(
    //     {"_id": new ObjectID("5942b2914d768c518e961e16")},
    //     {$set: {"completed": true}},
    //     {returnOriginal: false}
    // ).then((result) => {
    //     console.log(result)
    // });

    db.collection("users").findOneAndUpdate(
        {"_id": new ObjectID("5942a3e513be301e482e7043")},
        {$set: {"name": "Andrew"}, $inc: {age: 1}},
        {returnOriginal: false}
    ).then((result) => {
        console.log(result)
    });


    //db.close();

});

