// iot_device.js
'use strict';

const DEFAULT_MQTT_SERVER_ADDRESS = 'mqtts://127.0.0.1:8883';

const mqtt = require('mqtt');
const EventEmitter = require('events');

let heartbeatCounter;

class IotDevice extends EventEmitter {

    constructor({
        serverAddress = DEFAULT_MQTT_SERVER_ADDRESS,
        productName,
        deviceName,
        clientId,
        secret} = {}) {
            super();
            this.serverAddress = serverAddress;
            this.productName = productName;
            this.deviceName = deviceName;
            this.secret = secret;
            this.userName = `${productName}/${deviceName}`;
            this.clientId = clientId != null ? `${this.userName}/${clientId}` : this.userName;
    }

    connect() {
        let self = this;
        // console.log(`serverAddress:${this.serverAddress}, username:${this.userName}, password:${this.secret}`);
        this.client = mqtt.connect(this.serverAddress, {
            rejectUnauthorized: false,
            clientId: this.clientId,
            username: this.userName,
            password: this.secret
        });
        this.client.on('connect', function (connAck) {
            console.log(`connect return code: ${connAck.returnCode}`);
            if (connAck.returnCode == 0) {
                self.emit('online');    
                heartbeatCounter = setInterval(() => {
                    self.emit('heartbeat');
                }, 3000);
            }
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