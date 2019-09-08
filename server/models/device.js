var Schema = require('mongoose');

const deviceSchema = new Schema({
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

module.exports = deviceSchema;