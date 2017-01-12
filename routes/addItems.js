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
  var newItem = new Item (req.body);
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
