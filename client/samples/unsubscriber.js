var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://iot.eclipse.org', {
    clientId: 'mqtt_sample_subscriber_id',
    clean: false
})

client.on('connect', function(connAck) {
    console.log(`connect return code: ${connAck.returnCode}`)
    if (connAck.returnCode == 0) {
        client.unsubscribe('neil/mqtt/#', function(err) {
            if (err != undefined) {
                console.log('unsubscribe failed')
            } else {
                console.log('unsubscribe succeeded')
            }
            client.end()
        })
    } else {
        console.log('connect failed')
    }
})