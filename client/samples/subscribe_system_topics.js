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
        var password = token.password;
        connectToMqttServer(userName, password);
    }).on('error', function (err) {
        console.error(err);
    });
});
req.end();

function connectToMqttServer(userName, password) {
    console.log(`userName:${userName}, password:${password}`);
    const client = mqtt.connect(process.env.MQTTS_SERVER_URL, {
        username: userName,
        password: password,
        rejectUnauthorized: false
    });

    client.on('connect', function (connAck) {
        console.log(connAck);
        if (connAck.returnCode == 0) {                
            client.subscribe(
                [
                    '$SYS/brokers/+/clients/+/+/connected',
                    '$SYS/brokers/+/clients/+/+/+/connected',
                    '$SYS/brokers/+/clients/+/+/disconnected',
                    '$SYS/brokers/+/clients/+/+/+/disconnected'
                ], function(err, granted) {
                    if (err != undefined) {
                        console.log('subscribe failed with error:' + err)
                    } else {
                        for (var i = 0; i < granted.length; i++) {
                            console.log(`successfully subscribed to topic: ${granted[i].topic}`);
                        }
                    }
                });
        }
    });

    client.on('message', function (topic, message, _) {
        console.log(`received message ${message.toString()} on topic ${topic}`);
        var msgJson = JSON.parse(message);
        var cid = msgJson.clientid;
        var disconnected = topic.endsWith('disconnected');
        if (disconnected) {
            console.log(`device(${cid}) disconnected`);
        } else {
            console.log(`device(${cid}) connected`);
        }
    });

    client.on('error', function (err) {
        console.error(err);
    });
}
