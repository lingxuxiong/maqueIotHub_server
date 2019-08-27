const constants = require('./constants');
const mqtt = require('mqtt');

var client = mqtt.connect(constants.MQTTS_SERVER_URL, {
    clientId: constants.PUBLISHER_ID,
    clean: false,
    rejectUnauthorized: false
});

client.on('connect', function (connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    if (connAck.returnCode == 0) {
        setInterval(() => {
            publishSpeed();
        }, constants.REPORT_STATE_FREQUENCY_MS);        
    } else {
        console.log(`connection failed due to ${connAck.returnCode}`)
    }
});

function publishSpeed() {
    var speed = Math.ceil(Math.random() * 100);
    var lng = 102.8622543812;
    var lat = 24.8614503916;
    var load = 1200101;
    var message = {
        "speed": speed, 
        "lng": lng,
        "lat": lat,
        "load": load
    };
    console.log(JSON.stringify(message));

    client.publish(constants.TOPIC_VEHICLE_SPEED, JSON.stringify(message), { qos: 1 }, function (error) {
        if (error == undefined) {
            console.log('publish finished');
        } else {
            console.log('publish failed:' + error.message);
        }
    })
}