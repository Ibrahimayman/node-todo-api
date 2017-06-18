/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */

const express = require('express');
const bodyParser = require("body-parser");
const _ = require("lodash");
const {ObjectID} = require("mongodb");

// local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {authenticate} = require("./middleware/authenticate");

var app = express();
app.use(bodyParser.json());

// insert new document.
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

// delete document.
app.delete("/todos/:id", (req, res) => {
    // get the id
    var id = req.params.id;
    //validate the id
    if (!ObjectID.isValid) {
        res.status(400).send();
    }
    // remove todo by id
    Todo.findByIdAndRemove({_id: id}).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

// update document.
app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid) {
        res.status(400).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// insert new user.
app.post("/users", (req, res) => {
    var body = _.pick(req.body, ['email', 'password']); // pick only mail and pass.
    var user = new User(body);
    user.save().then((user) => {
        //res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// get user
app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
});


// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(process.env.port || 3000, () => {
    console.log("app running");
});



