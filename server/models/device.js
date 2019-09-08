var mongoose = require('mongoose');

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

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;