var express = require("express");
var router = express.Router();

router.get('/', function(request, response){
    response.send({tezt:'blblblb'});
});

module.exports=router;