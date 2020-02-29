var express = require("express");
var router = express.Router();
var crypto = require('crypto');
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var usersModel = mongoose.model('users', {
    username: String,
    password: String
});



router.get('/users', function (request, response) {
    usersModel.findOne({ 'username': 'Daasdn' }, 'username password', function (err, users) {
        if (users) {
            return response.json({ password: users.password });
        } else {
            return response.json({ error: "username does not exists" });
        }
    });



});

router.post('/register', function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    if (!username || !password) {
        return response.status(400).send('Missing fields')
    }

    usersModel.findOne({ 'username': username }, 'username password', function (err, users) {
        if (users) {
            return response.status(400).send('username already existed. try another one')
        } else {
            var cryptedPassword = crypto.createHash('sha256').update(password).digest('base64');
            var newUser = [{ 'username': username, 'password': cryptedPassword }]
            usersModel.insertMany(newUser, function (err, res) {
                if (err) {
                    console.log(err)
                    return response.status(500).send('an error occured')
                } else {
                    return response.status(500).send('register successfully')
                }

            })
        }
    });
});

router.post('/login', function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    if (!username || !password) {
        return response.status(400).send('Missing fields')
    }

    var cryptedPassword = crypto.createHash('sha256').update(password).digest('base64');

    usersModel.findOne({ 'username': username }, 'username password', function (err, users) {
        if (users) {
            if (cryptedPassword == users.password) {
                return response.send('You are real');
            } else {
                return response.send('You arnt real');
            }
        } else {
            return response.send('username does not exist');
        }
    });



});

module.exports = router;