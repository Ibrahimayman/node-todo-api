/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */

var express = require('express');
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");

// local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {user} = require("./models/user");


var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// get all docs.
app.get("/todos", (req, res) => {
    Todo.find().then((docs) => {
        res.send({docs});
    }, (e) => {
        res.status(400).send(e);
    });
});

// Get by Param
app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    // validate id using IsValid
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    // select one document by Id.
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(process.env.port || 3000, () => {
    console.log("app running");
});



