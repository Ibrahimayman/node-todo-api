/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */

var express = require('express');
var bodyParser = require("body-parser");

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


app.listen(process.env.port || 3000, () => {
    console.log("app running");
});



