// iot_device.js
'use strict';

const DEFAULT_MQTT_SERVER_ADDRESS = 'mqtts://127.0.0.1:8883';

const mqtt = require('mqtt');
const EventEmitter = require('events');

let heartbeatCounter;

class IotDevice extends EventEmitter {

    constructor(serverAddress = DEFAULT_MQTT_SERVER_ADDRESS) {
        super();
        this.serverAddress = serverAddress;
    }

    connect() {        
        let self = this;
        this.client = mqtt.connect(this.serverAddress, {
            rejectUnauthorized: false
        });
        this.client.on('connect', function (connAck) {
            console.log(`connect return code: ${connAck.returnCode}`);
            self.emit('online');

            heartbeatCounter = setInterval(() => {
                self.emit('heartbeat');
            }, 1000);
        });

        this.client.on('message', function (_, data, pkg) {
            self.emit('message', data.toString());
        });

        this.client.on('error', function (err) {
            self.emit('error', err);
        });
    }

    disconnect() {
        if (this.client !== undefined) {
            clearInterval(heartbeatCounter);
            this.emit('offline');
            this.client.end();
        }
    }
}

module.exports = {
    IotDevice: IotDevice
}