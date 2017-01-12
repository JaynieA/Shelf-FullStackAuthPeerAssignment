var express = require('express');
var router = express.Router();
var Items = require('../models/items.js');

router.get('/', function(req, res) {
  console.log('get route hit');
  Items.find({}, function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
}); // end get

router.get('/validate', function(req, res) {
  console.log('validate route hit on /items');
  var verified;
  if (!req.user) {
    verified = false;
  } else {
    verified = true;
  }
  res.send({verified: verified});
}); // end get

router.delete('/:id', function(req, res){
  console.log('delete route hit');
  console.log('req.body id', req.params);
  Items.remove({_id: req.params.id},function(err){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });// end remove 
});//end router delete

module.exports = router;
