const router = require('express').Router();
const Device = require('../server/models/device');

router.post('/', function (req, res, _) {
    // console.log(req.body);
    var splits = req.body.action.split('_');
    var event = splits[0];
    var connection = splits[1];
    console.log(`${event} ${connection}`);
    if (event == 'client') {
        Device.updateConnection(connection, req.body);
    }
    
    res.status(200).send('ok');
});

module.exports = router;