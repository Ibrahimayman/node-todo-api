/**
 * Created by Ibrahim Ayman on 15/06/2017.
 */

var mongoose = require("mongoose");

mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost:27017/TodoApp"); // mongoose contains connection all time

module.exports = {mongoose};