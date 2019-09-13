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

deviceSchema.methods.toJSONObject = function () {
    return {
        product_name: this.product_name,
        device_name: this.device_name,
        secret: this.secret
    }
}

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;