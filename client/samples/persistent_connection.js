require('dotenv').config();

let mqtt = require('mqtt');

var client = mqtt.connect(process.env.MQTTS_SERVER_URL, {
    clientId: process.env.CLIENT_UNIQUE_ID,
    clean: false,
    rejectUnauthorized: false
});

client.on('connect', function(connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    client.end()
});