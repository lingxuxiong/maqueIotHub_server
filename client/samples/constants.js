const MQTT_SERVER_URL  = 'mqtt://127.0.0.1:1883';
const MQTTS_SERVER_URL = 'mqtts://127.0.0.1:8883';
const CLIENT_UNIQUE_ID = 'client_id';
const PUBLISHER_ID     = 'client_publisher_id';
const SUBSCRIBER_ID    = 'client_subscriber_id';

const TOPIC_VEHICLE_SPEED = '/vehicle/device_id/state'
const TOPIC_HALL       = '/neil/hall';
const TOPIC_KITCHEN    = '/neil/kitchen';
const TOPIC_ROOM1      = '/neil/room1';
const TOPIC_ROOM2      = '/neil/room2';

const REPORT_STATE_FREQUENCY_MS = 1000;

module.exports = {
    MQTT_SERVER_URL: MQTT_SERVER_URL,
    MQTTS_SERVER_URL: MQTTS_SERVER_URL,
    CLIENT_UNIQUE_ID: CLIENT_UNIQUE_ID,
    PUBLISHER_ID: PUBLISHER_ID,
    SUBSCRIBER_ID: SUBSCRIBER_ID,
    TOPIC_VEHICLE_SPEED: TOPIC_VEHICLE_SPEED,
    REPORT_STATE_FREQUENCY_MS: REPORT_STATE_FREQUENCY_MS
}