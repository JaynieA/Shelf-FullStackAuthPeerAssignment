var express = require( 'express' );
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  var regPath = path.join(__dirname, '../public/views/addItem.html');
  res.sendFile(regPath);
});

module.exports = router;
