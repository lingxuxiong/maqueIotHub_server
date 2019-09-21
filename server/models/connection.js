const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    client_id: String,
    user_name: String,
    ip_address: String,
    connected: Boolean,
    proto_ver: Number,
    conn_ack: Number,
    keep_alive: Number,
    connected_at: Number,
    disconnected_at: Number,
    reason: String,
    device: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Device'
    }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;

