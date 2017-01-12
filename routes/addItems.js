var express = require( 'express' );
var router = express.Router();
var path = require('path');
var Item = require('../models/items.js');

router.get('/', function(req, res) {
  // if user is not logged in, redirect to login page
  if (!req.user) {
    var homePath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(homePath);
  } else {
    //display add item page
    var addItemPath = path.join(__dirname, '../public/views/addItem.html');
    res.sendFile(addItemPath);
  }
});

router.post('/', function(req, res){
  console.log('req.body ->', req.body);
  console.log('req.user', req.user);
  var description = req.body.description;
  var img_url = req.body.img_url;
  var placer = req.user.username;
  var newItem = new Item ({
    description: description,
    placer: placer,
    img_url: img_url
  });
  newItem.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }//end else
  });//end save
});//end post

module.exports = router;
