var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  console.log('got vehicle speeding:' + req.body.speed);
  res.sendStatus(200);
});

router.put('/user', function(req, res) {
  console.log('got put request to /user')
  res.send('ok')
});


module.exports = router;
