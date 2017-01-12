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




module.exports = router;
