const router = require('express').Router();
const Connection = require('../server/models/connection');

router.post('/', function (req, res, _) {
    // console.log(req.body);
    var splits = req.body.action.split('_');
    var event = splits[0];
    var action = splits[1];
    console.log(`${event} ${action}`);
    if (event == 'client') {
        persistDeviceConnectionEvent(action, req.body);
    }
    
    res.status(200).send('ok');
});

function persistDeviceConnectionEvent(connection, event) {
    console.log(event);
    // connected event = { action: 'client_connected',
    //   client_id: 'productX/UNjDnSn/deviceId',
    //   username: 'productX/UNjDnSn',
    //   keepalive: 60,
    //   ipaddress: '127.0.0.1',
    //   proto_ver: 4,
    //   connected_at: 1569045216,
    //   conn_ack: 0 }

    // disconnected event = { action: 'client_disconnected',
        // client_id: 'productX/UNjDnSn/deviceId',
        // username: 'productX/UNjDnSn',
        // reason: 'normal' }
    
    var clientId = event.client_id;
    var connected = connection == 'connected';
    Connection.findOneAndUpdate({
        "client_id" : clientId
    }, {
        connected: connected
    }, function (err, device) {
        if (err == null && device == null) {
            console.log(`saved ${connected} event`);
            new Connection({
                client_id: event.client_id,
                user_name: event.username,
                keep_alive: event.keepalive,
                ip_address: event.ipaddress,
                proto_ver: event.proto_ver,
                connected: connected,
                conn_ack: event.conn_ack,
                connected_at: event.connected_at,
                disconnected_at: event.disconnected_at,
                reason: event.reason
            }).save(function (err, document) {
                if (err) {
                    console.log(`save device ${connection} error ${err}`);
                }
                console.log(`saved new ${connection} event`);
            });
        } else if (device != null) {
            console.log(`updated ${connection} event`);
        } else {
            console.log(`record query error ${err} for device id ${clientId}`);
        }
    }).exec();
}

module.exports = router;