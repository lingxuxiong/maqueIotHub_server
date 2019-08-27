var args = require('yargs').argv
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://iot.eclipse.org', {
    clientId: 'mqtt_sample_publish_with_qos_id',
    clean: false
})

client.on('connect', function(connAck) {
    console.log(`return code ${connAck.returnCode}, session present:${connAck.sessionPresent}`)
    if (connAck.returnCode == 0) {
        client.on('packetsend', function (packet) {
            console.log(`send: ${packet.cmd}`)
        })
        client.on('packetreceive', function (packet) {
            console.log(`receive: ${packet.cmd}`)
        })
        client.publish('neil/mqtt/hello', JSON.stringify({'temp':30}), {qos : args.qos}, function(error) {
            if (error == undefined) {
                console.log('publish finished')
                //client.end()
            } else {
                console.log('publish failed:' + error.message)
            }
        })
    } else {
        console.log(`connection failed due to ${connAck.returnCode}`)
    }
    
})