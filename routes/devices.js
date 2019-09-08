const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Device = require('../server/models/device');

router.post('/', function (req, res) {
    var productName = req.body.product_name;
    var deviceName = shortid.generate();
    var secret = shortid.generate();
    var brokerUserName = `${productName}/${deviceName}`;

    var newDevice = new Device({
        product_name: productName,
        deviceName: deviceName,
        secret: secret,
        broker_username: brokerUserName
    });

    res.json({
        product_name: productName,
        deviceName: deviceName,
        secret: secret,
        broker_username: brokerUserName
    });

});

router.get('/', function (req, res) {
    console.log('fetch all device');
    res.send('ok');
});

module.exports = router;