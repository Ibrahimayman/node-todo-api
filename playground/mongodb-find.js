//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); // this line is identical to the obove code.

MongoClient.connect("mongodb://localhost:27017/TodoApp", function (err, db) {
    if (err) {
        return console.log("unable to connect mongo bd server");
    }
    console.log("connected mongo bd server");

    // db.collection("todos").find({
    //     _id: new ObjectID('59423ef9e3526031249d241b')
    // }).toArray().then(function (docs) {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, function (err) {
    //     if (err) {
    //         console.log("unable to fetch data" + err);
    //     }
    // });

    db.collection("todos").find().count().then(function (count) {
        console.log("Todos count: " + count);
    }, function (err) {
        if (err) {
            console.log("unable to fetch data" + err);
        }
    });


    // db.close();
});

