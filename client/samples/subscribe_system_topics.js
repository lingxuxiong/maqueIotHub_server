'use strict'

require('dotenv').config();

let http = require('http');
let mqtt = require('mqtt');

const req = http.request({
    method: 'POST',
    host: process.env.EXPRESS_SERVER_HOST,
    port: process.env.EXPRESS_SERVER_PORT,
    path: '/tokens'
}, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function onReceivedJWTToken(data) {
        var token = JSON.parse(data);
        var userName = token.userName;
        var password = token.token;
        connectToMqttServer(userName, password);
    }).on('error', function (err) {
        console.error(err);
    });
});
req.end();

function connectToMqttServer(userName, password) {
    const client = mqtt.connect(process.env.MQTTS_SERVER_URL, {
        username: userName,
        password: password,
        rejectUnauthorized: false
    }, function onConnectResult(err, connAck) {
        if (err) {
            console.error(err);
        } else {
            console.log(connAck);
            if (connAck.returnCode == 0) {                
                client.subscribe(
                    [
                        '$SYS/brokers/+/clients/connected',
                        '$SYS/brokers/+/clients/disconnected'
                    ], function(err, granted) {
                        if (err != undefined) {
                            console.log('subscribe failed with error:' + err)
                        } else {
                            console.log(`successfully subscribed topic ${granted[0].topic}, qos: ${granted[0].qos}}`)
                        }
                    });
            }
        }
    });
}
