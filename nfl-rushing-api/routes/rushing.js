var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.header("Content-Type",'application/json');
  res.status(200);
  res.sendFile(path.resolve('./data/rushing.json'));
});

module.exports = router;
