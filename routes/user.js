var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

//get all users from database
router.get('/', function(req, res){
  console.log('get user route hit');
  var usernames = [];
  User.find({}, function(err, response) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      for (var i = 0; i < response.length; i++) {
        usernames.push(response[i].username);
      } // end for
      res.send(usernames);
    } // end else
  }); // end find
}); // end get

module.exports = router;
