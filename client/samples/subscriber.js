let constants = require('./constants');
let mqtt = require('mqtt');

var client = mqtt.connect(constants.MQTTS_SERVER_URL, {
    clientId: constants.SUBSCRIBER_ID,
    clean: true,
    rejectUnauthorized: false,
    username: 'userid_001',
    password: 'd37d0c18fb94382f3934e4027ec1345fbfe27a5ff99c9b05542c0c7a6badf11d'
});

client.on('connect', function(connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    if (connAck.returnCode == 0) {
        if (connAck.sessionPresent == false) {
            console.log('subscribing')
            client.subscribe(constants.TOPIC_VEHICLE_SPEED, {
                qos: 1
            }, function(err, granted) {
                if (err != undefined) {
                    console.log('subscribe failed with error:' + err);
                } else {
                    console.log(`successfully subscribed topic ${granted[0].topic}, qos: ${granted[0].qos}}`);
                }
            })
        } else {
            console.log('session already present');
        }
    } else {
        console.log(`connection failed: ${connAck.returnCode}`);
    }
});

client.on('message', function(_, message, _) {
    var state = JSON.parse(message.toString());
    console.log(`received speed is ${state.speed}`);
});