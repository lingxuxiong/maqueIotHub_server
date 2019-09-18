const router = require('express').Router();

router.post('/', function (req, res, _) {
    // var clientId = req.body.client_id;
    // var splits = req.body.action.split('_');
    // var event = splits[0];
    // var action = splits[1];
    // console.log(`client (${clientId}) ${event} ${action}`);
    console.log(req.body);
    res.status(200).send('ok');
})

module.exports = router;