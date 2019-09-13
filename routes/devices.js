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
        device_name: deviceName,
        secret: secret,
        broker_username: brokerUserName
    });
    newDevice.save(function (err, device) {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            res.json(newDevice.toJSONObject());
        }
    });
});

router.get('/:productName/:deviceName', function (req, res) {
    var productName = req.params.productName;
    var deviceName = req.params.deviceName;
    //console.log(`productName: ${productName}, deviceName:${deviceName}`);

    Device.findOne({
        "product_name": productName,
        "device_name": deviceName
    }, function (err, device) {
        if (err) {
            res.send(err);
        } else {
            if (device != null) {
                res.send(device.toJSONObject());
            } else {
                res.status(404).json({error: "Not found"});
            }
        }
    });
});

router.get('/:productName', function (req, res) {
    Device.find({
        "product_name": req.params.productName
    }, function (err, devices) {
        if (err) {
            res.send(err);
        } else {
            if (devices != null && devices.length > 0) {
                res.json(devices.map(function (device) {
                    return device.toJSONObject();
                }));
            } else {
                res.status(404).json({error: "Not found"});
            }
        }
    });
});

module.exports = router;