/**
 * Prerequisites:
 * 1. EMQX configurations:
 * auth.mongo.database = iothub
 * auth.mongo.auth_query.collection = devices
 * auth.mongo.auth_query.password_field = secret
 * auth.mongo.auth_query.selector = broker_username=%u
 * 
 * 2. A test device with auth credentials in mongo
 */

'use strict';

require('dotenv').config();

let IotDevice = require('../sdk/iot_device').IotDevice;
let device = new IotDevice({
    productName: process.env.TEST_PRODUCT_NAME,
    deviceName: process.env.TEST_DEVICE_NAME,
    secret: process.env.TEST_DEVICE_SECRET,
    clientId: process.env.TEST_CLIENT_ID
});

let heartbeat = 0;

device.on('online', function () {
    console.log('device gets online');
})

device.on('heartbeat', function () {
    heartbeat = heartbeat + 1;
    console.log(`heartbeat: ${heartbeat}`);
    if (heartbeat === process.env.MAX_HEART_BEATS_NUM) {
        console.log(`hit max heartbeat: ${process.env.MAX_HEART_BEATS_NUM}`);
        device.disconnect();
    }
});

device.on('message', function (message) {
    console.log(`new message: ${message}`);
})

device.on('offline', function () {
    console.log('device gets offline');
})

device.on('error', function error(err) {
    console.log('got error:' + err);
})

device.connect();