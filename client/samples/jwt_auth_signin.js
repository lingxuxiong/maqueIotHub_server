var mqtt = require('mqtt');
var jwt = require('jsonwebtoken');

var password = jwt.sign({
    username: "jwt_user",
    exp: Math.floor(Date.now() / 1000) + 10
}, 'emqxsecret');

var client = mqtt.connect(
    "mqtt://127.0.0.1:1883",
    {
        username: "jwt_user",
        password: password
    }
);

client.on('connect', function (connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    client.end()
});

client.on('error', function (err) {
    console.log('connection error:' + err);
});