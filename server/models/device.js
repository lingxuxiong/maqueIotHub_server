const mongoose = require('mongoose');
const Connection = require('../models/connection')

const deviceSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },

    device_name: {
        type: String,
        required: true
    },

    broker_username: {
        type: String,
        required: true
    },

    secret: {
        type: String,
        required: true
    }

});

deviceSchema.methods.toJSONObject = function () {
    return {
        product_name: this.product_name,
        device_name: this.device_name,
        secret: this.secret
    }
}

deviceSchema.statics.onDeviceConnected = function(data) {
    console.log(data);
    // Connection data = { action: 'client_connected',
    //   client_id: 'productX/UNjDnSn/deviceId',
    //   username: 'productX/UNjDnSn',
    //   keepalive: 60,
    //   ipaddress: '127.0.0.1',
    //   proto_ver: 4,
    //   connected_at: 1569045216,
    //   conn_ack: 0 }    
    var clientId = data.client_id;
    Connection.findOneAndUpdate({
        "client_id" : clientId
    }, {
        connected: true,
        conn_ack: data.conn_ack,
        connected_at: data.connected_at,
        device: device._id
    }, function (err, device) {
        if (err == null && device == null) {
            console.log(`saving new connection event`);
            new Connection({
                client_id: data.client_id,
                user_name: data.username,
                keep_alive: data.keepalive,
                ip_address: data.ipaddress,
                proto_ver: data.proto_ver,
                connected: true,
                conn_ack: data.conn_ack,
                connected_at: data.connected_at,
                disconnected_at: null,
                reason: null
            }).save(function (err, document) {
                if (err) {
                    console.log(`save device connection error ${err}`);
                }
                console.log(`saved new connection event`);
            });
        } else if (device != null) {
            console.log(`updated connection event`);
        } else {
            console.log(`record query error ${err} for device id ${clientId}`);
        }
    }).exec();
}

deviceSchema.statics.onDeviceDisconnected = function(data) {
    console.log(data);
    // disconnected data = { action: 'client_disconnected',
        // client_id: 'productX/UNjDnSn/deviceId',
        // username: 'productX/UNjDnSn',
        // reason: 'normal' }    
    var clientId = data.client_id;
    Connection.findOneAndUpdate({
        "client_id" : clientId
    }, {
        connected: false,
        disconnected_at: Date.now(),
        reason: data.reason,
        device: device._id
    }, function (err, device) {
        if (err == null && device == null) {
            console.log(`saving new disconnection event`);
            new Connection({
                client_id: data.client_id,
                user_name: data.username,
                keep_alive: data.keepalive,
                ip_address: data.ipaddress,
                proto_ver: data.proto_ver,
                connected: false,
                conn_ack: 0,
                connected_at: null,
                disconnected_at: Date.now(),
                reason: data.reason
            }).save(function (err, document) {
                if (err) {
                    console.log(`save device disconnection error ${err}`);
                }
                console.log(`saved new disconnection event`);
            });
        } else if (device != null) {
            console.log(`updated disconnection event`);
        } else {
            console.log(`record query error ${err} for device id ${clientId}`);
        }
    }).exec();
}

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;