var args = require('yargs').argv
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://iot.eclipse.org', {
    clientId: 'mqtt_sample_subscriber_with_qos_id',
    clean: false
})

client.on('connect', function(connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    if (connAck.returnCode == 0) {
        console.log('subscribing')

        client.on('packetsend', function(package) {
            console.log(`send:${package.cmd}`)
        })
        client.on('packetreceive', function(package) {
            console.log(`receive:${package.cmd}`)
        })
        
        client.subscribe('neil/mqtt/#', {
            qos: args.qos
            }, function(err, granted) {
                if (err != undefined) {
                    console.log('subscribe failed with error:' + err)
                } else {
                    console.log(`successfully subscribed topic ${granted[0].topic}, qos: ${granted[0].qos}}`)
                }
            })
    } else {
        console.log(`connection failed: ${connAck.returnCode}`)
    }
})

client.on('message', function(_, message, _) {
    var jsonPayload = JSON.parse(message.toString())
    console.log(`received temp is ${jsonPayload.temp}`)
})