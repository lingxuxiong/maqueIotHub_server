### Goal
- [x] create an EMQ X based broker.
- [x] create a MQTT based client which is able to publish message to the broker.
- [x] create a MQTT based client which is able to subscribe to topics thru the broker.
- [x] send and receive messages thru publisher -> broker(s) -> receiver.
- [ ] filter MQTT messages based on EMQX rule engine.
- [ ] republish filtered messages to a specified local server endpoint.
- [ ] print received messages to stdout.
- [ ] persist received messages to db.
- [ ] create a local HTTP server which serve to process the received MQTT messages.

### Steps
1. Install [EMQX](https://docs.emqx.io/docs/broker/v3/cn/install.html#macos) and start it
* emqx start
* emqx_ctl status
2. 
2. create local http server by following the [Express 'hello world' example](https://expressjs.com/en/starter/hello-world.html)
2. start web server at localhost port 3000
- DEBUG=maqueiothub:* npm start (debug node)
- npm start (production mode)
