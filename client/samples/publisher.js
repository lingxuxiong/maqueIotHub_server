require('dotenv').config();

const mqtt = require('mqtt');

var client = mqtt.connect(process.env.MQTTS_SERVER_URL, {
    clientId: process.env.PUBLISHER_ID,
    clean: false,
    rejectUnauthorized: false,
    username: 'userid_001',
    password: 'd37d0c18fb94382f3934e4027ec1345fbfe27a5ff99c9b05542c0c7a6badf11d'
});

client.on('connect', function (connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    if (connAck.returnCode == 0) {
        setInterval(() => {
            publishSpeed();
        }, process.env.REPORT_STATE_FREQUENCY_MS);        
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

    client.publish(process.env.TOPIC_VEHICLE_SPEED, JSON.stringify(message), { qos: 1 }, function (error) {
        if (error == undefined) {
            console.log('publish finished');
        } else {
            console.log('publish failed:' + error.message);
        }
    })
}