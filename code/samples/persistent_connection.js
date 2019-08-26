let constants = require('./constants');
let mqtt = require('mqtt');

var client = mqtt.connect(constants.MQTT_SERVER_URL, {
    clientId: constants.CLIENT_UNIQUE_ID,
    clean: false
});

client.on('connect', function(connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    client.end()
});