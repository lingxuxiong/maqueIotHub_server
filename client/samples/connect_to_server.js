'use strict';

const MAX_HEART_BEATS_NUM = 3;

let devices = require('../sdk/iot_device');
let device = new devices.IotDevice();

let heartbeat = 0;

device.on('online', function () {
    console.log('device gets connected');
})

device.on('heartbeat', function () {
    heartbeat = heartbeat + 1;
    console.log(`heartbeat: ${heartbeat}`);
    if (heartbeat === MAX_HEART_BEATS_NUM) {
        console.log(`hit max heartbeat: ${MAX_HEART_BEATS_NUM}`);
        device.disconnect();
    }
});

device.on('message', function (message) {
    console.log(`new message: ${message}`);
})

device.on('offline', function () {
    console.log('device gets disconnected');
})

device.on('error', function error(err) {
    console.log('got error:' + err);
})

device.connect();