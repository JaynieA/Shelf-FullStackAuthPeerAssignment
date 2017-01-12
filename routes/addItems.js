var express = require( 'express' );
var router = express.Router();
var path = require('path');
var Item = require('../models/items.js')


router.get('/', function(req, res) {
  var regPath = path.join(__dirname, '../public/views/addItem.html');
  res.sendFile(regPath);
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
