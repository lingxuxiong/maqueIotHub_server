var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('__dirname:' + __dirname)
  console.log('__filename:' + __filename)
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  console.log('got post request to /')
  res.send("ok")
});

router.put('/user', function(req, res) {
  console.log('got put request to /user')
  res.send('ok')
});


module.exports = router;
