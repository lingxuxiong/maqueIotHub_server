var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var productName = req.body.productName;
    var deviceName = shortid.
});

router.get('/', function (req, res) {
    console.log('fetch all device');
    res.send('ok');
});

module.exports = router;