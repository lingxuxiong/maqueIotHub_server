var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1:1883', {
    clientId: "mqtt_connection_identical_id",
    clean: false
})

client.on('connect', function(connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    client.end()
})