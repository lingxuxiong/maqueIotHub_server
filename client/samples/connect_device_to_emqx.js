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

const MAX_HEART_BEATS_NUM = 10;

const TEST_PRODUCT_NAME  = 'productX';
const TEST_DEVICE_NAME   = 'UNjDnSn';
const TEST_DEVICE_SECRET = 'SoKJ5mqH';
const TEST_CLIENT_ID     = 'deviceId';

let IotDevice = require('../sdk/iot_device').IotDevice;
let device = new IotDevice({
    productName: TEST_PRODUCT_NAME,
    deviceName: TEST_DEVICE_NAME,
    secret: TEST_DEVICE_SECRET,
    clientId: TEST_CLIENT_ID
});

let heartbeat = 0;

device.on('online', function () {
    console.log('device gets online');
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
    console.log('device gets offline');
})

device.on('error', function error(err) {
    console.log('got error:' + err);
})

device.connect();