## Prerequisites
1. disallow anonymous login
- anonymous login is allowed by default, should disable it.
(vim /usr/local/Cellar/emqx/3.2.2/etc/emqx.conf)
> allow_anonymous = false

### MongoDB auth
- https://docs.emqx.io/tutorial/v3/en/security/auth.html
- https://docs.emqx.io/tutorial/v3/en/backend/mongo.html

1. config mongo auth params
<pre>
## Mongo authentication database name
auth.mongo.database = mqtt

## Collection used for authentication
auth.mongo.auth_query.collection = mqtt_user

## Password field
auth.mongo.auth_query.password_field = password

## Use plain approach for password field
auth.mongo.auth_query.password_hash = sha256,salt (/plain)

## Query command
auth.mongo.auth_query.selector = username=%u
</pre>

2. create and update credentials in mongo db
<pre>
## start mongo
> mongod --config /usr/local/etc/mongod.conf

2. connect to mongo shell 
> mongo

## create login credentials, using mqtt database
> use mqtt

## insert new entry
> db.mqtt_user.insert( { username: 'userid_001', password: 'publicmysalt', is_superuser: false } )

## update password to confirm to SHA256 requirement
## https://www.liavaag.org/English/SHA-Generator/
> db.mqtt_user.updateOne( {username: "userid_001"}, {$set: {password: "d37d0c18fb94382f3934e4027ec1345fbfe27a5ff99c9b05542c0c7a6badf11d"}} )
</pre>

3. emqx restart

4. verify credentials with mosquitto_sub
<pre>
mosquitto_sub -h 127.0.0.1 -u userid_001 -P d37d0c18fb94382f3934e4027ec1345fbfe27a5ff99c9b05542c0c7a6badf11d  -t /vehicle/speed -d

Client mosq/AbwcbaV6q19sQL8GhB sending CONNECT
Client mosq/AbwcbaV6q19sQL8GhB received CONNACK (0)
Client mosq/AbwcbaV6q19sQL8GhB sending SUBSCRIBE (Mid: 1, Topic: /vehicle/speed, QoS: 0, Options: 0x00)
Client mosq/AbwcbaV6q19sQL8GhB received SUBACK
Subscribed (mid: 1): 0
</pre>

5. connect mqtt broker with new credentials
<pre>
var client = mqtt.connect(process.env.MQTTS_SERVER_URL, {
    clientId: process.env.SUBSCRIBER_ID,
    clean: true,
    rejectUnauthorized: false,
    username: 'userid_001',
    password: 'd37d0c18fb94382f3934e4027ec1345fbfe27a5ff99c9b05542c0c7a6badf11d'
});
</pre>

6. open/close ACL for publish and subscribe
auth.mongo.acl_query = off

7. create mongo indexes
<pre>
use iothub
db.devices.createIndex({
    "product_name": 1,
    "device_name": 1
}, {unique: true})

db.devices.createIndex({
    "broker_username": 1
})
</pre>

### User name and password auth
- Dashboard + Curl
1. Create appID and appSecret thru dashboard
user:pwd -> 42977a2f31e73:MjkwMDYwNjQ5ODc2MDIxMTQ3ODE3MzM3MTgxMTg4MjU5ODE
2. Run CURL command to create auth user
<pre>
curl -v 
--basic -u 42977a2f31e73:MjkwMDYwNjQ5ODc2MDIxMTQ3ODE3MzM3MTgxMTg4MjU5ODE 
-X POST http://localhost:8080/api/v3/auth_username 
-d '{ "username":"neil", "password":"pwd" }'
</pre>

- CLI
1. add new user with [SHA256](https://www.liavaag.org/English/SHA-Generator/) hashed password
emqx_ctl users add neil 6cd4c9c389b460a1f60357bebdec27a788c4abbf1aa3dead4d3c0cfd0cebea2a
2. list available users to confirm the user was created
emqx_ctl users list
3. mosquitto_sub to receive system-wide topic messages
<pre>
mosquitto_sub -h 127.0.0.1 -u neil -P 6cd4c9c389b460a1f60357bebdec27a788c4abbf1aa3dead4d3c0cfd0cebea2a  -t '$SYS/brokers/#'  -d
</pre>

- [EMQX Auth Username](https://github.com/emqx/emqx-auth-username)
- [EMQX_AUTH_USERNAME 使用指南](https://www.emqx.io/cn/blog/23)