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

router.get('/users', async function (request, response) {

    const users = await usersModel.find({});
    if (users) {
        return response.json(users);
    } else {
        return response.json({'error': 'no users'})
    }

});

router.post('/register', async function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    if (!username || !password) {
        return response.status(400).send('Missing fields')
    }


    const user = await usersModel.findOne({ 'username': username }, 'username password');
    if (user) {
        return response.status(400).send('username already existed. try another one')
    } else {
        var cryptedPassword = crypto.createHash('sha256').update(password).digest('base64');
        var newUser = [{ 'username': username, 'password': cryptedPassword }]
        await usersModel.insertMany(newUser);
        
        return response.status(200).send('register successfully')
    }
    
});

router.post('/login', async function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    if (!username || !password) {
        return response.status(400).send('Missing fields')
    }

    var cryptedPassword = crypto.createHash('sha256').update(password).digest('base64');

    var user = await usersModel.findOne({ 'username': username }, 'username password');
    if (user) {
        if (cryptedPassword == user.password) {
            return response.status(200).send('You are real');
        } else {
            return  response.status(400).send('You arnt real');
        }
    } else {
        return response.send('username does not exist');
    }

});

module.exports = router;