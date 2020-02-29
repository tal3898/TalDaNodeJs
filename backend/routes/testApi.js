var express = require("express");
var router = express.Router();
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var usersModel = mongoose.model('users', {
    username: String,
    password: String
  });


router.get('/users', function(request, response){
    usersModel.findOne({'username':'Daasdn'},'username password',function (err, users)  {
        if (users) {
            return response.json({password:users.password});    
        } else {
            return response.json({error: "username does not exists"});    
        }
    });


    
});

router.get('/tal', function(request, response){
    return response.send("blal");
    
});

router.post('/login', function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;
    if (!username || !password) {
        return response.status(400).send('Missing fields')
    }

    usersModel.findOne({'username': username},'username password',function (err, users)  {
        if (password == users.password) {
            return response.send('You are real');
        } else {
            return response.send('You arnt real');
        } 
    });



});

module.exports=router;