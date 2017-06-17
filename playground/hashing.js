/**
 * Created by Ibrahim Ayman on 17/06/2017.
 */

const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//****************************************************************************

var password = "132abc!";
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (e, hash) => {
        console.log(hash);
    });
});
var hashedPassword = "$2a$10$4RlAWcX4DTIqEGnp9TOk0eIzAYsqjiGCthKmayoGxwJOAednWQbse";
bcrypt.compare(password, hashedPassword, (e, result) => {
    console.log(result);
});

//****************************************************************************
// jwt sign
// jwt verify

// var data = {
//     id: 10
// };
//                            // secret
// var token = jwt.sign(data, '132abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '132abc');
// console.log("decoded :" + JSON.stringify(decoded));

//******************************************************************************

// var message = "i am user number 3 ";
//
// var hash = SHA256(message).toString();
//
// console.log(message);
//
// console.log(hash);
//
// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var ResultHash = SHA256(JSON.stringify(token.data) + "someSecret").toString();
//
// if (ResultHash === token.hash) {
//     console.log("data was not changed")
// }
// else {
//     console.log("data not trust");
// }
//

//************************************************************************************************