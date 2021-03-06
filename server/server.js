/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */
require('./config/config');
const express = require('express');
const bodyParser = require("body-parser");
const _ = require("lodash");
const {ObjectID} = require("mongodb");
const port = process.env.PORT;
// local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {authenticate} = require("./middleware/authenticate");

var app = express();
app.use(bodyParser.json());


// insert new document.
app.post("/todos", authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// get all docs for this user.
app.get("/todos", authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((docs) => {
        res.send({docs});
    }, (e) => {
        res.status(400).send(e);
    });
});

// Get by id.
app.get("/todos/:id", authenticate, (req, res) => {
    var id = req.params.id;
    // validate id using IsValid
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    // select one document by Id.
    Todo.findOne({
        _id: id,
        _creator: req.user._id // this param will pass vis header x-auth:----
    }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// delete document.
app.delete("/todos/:id", authenticate, (req, res) => {
    // get the id
    var id = req.params.id;
    //validate the id
    if (!ObjectID.isValid) {
        res.status(400).send();
    }
    // remove todo by id
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id // this param will pass vis header x-auth:----
    }).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// update document.
app.patch("/todos/:id", authenticate, (req, res) => {
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
    Todo.findOneAndUpdate({
        id: id,
        _creator: req.user._id // this param will pass vis header x-auth:----
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
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


// Delete Log Out
app.delete("/users/me/token", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => { // token param will pass from the header X-auth = -----
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};


