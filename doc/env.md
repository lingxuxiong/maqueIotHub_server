### MongoDB
1. install guide
https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials
  > key steps
    > 1. brew tap mongodb/brew
    > 2. brew install mongodb-community@4.2 
2. run mongo db instance
   1. run in the foreground
      > mongod --config /usr/local/etc/mongod.conf
   2. run as a service
      > brew services start mongodb-community@4.2
   3. connect a mongo shell to begin using mongodb
      > mongo

3. mongo shell commands
- connect to mongo -> mongo
- show databases -> show dbs
- switch to some db -> use xxx
- show collections under current db -> show collections
- show records of collection -> db.devices.find()

### Redis
1. install guide https://redis.io/download
 $ wget http://download.redis.io/releases/redis-5.0.5.tar.gz
 $ tar xzf redis-5.0.5.tar.gz
 $ cd redis-5.0.5
 $ make
2. online interactive tutorial: http://try.redis.io/
3. run redis.
> redis server
src/redis-server
interact with Redis using the built-in client:
$ src/redis-cli
redis> set foo bar
OK
redis> get foo
"bar"

### NodeJS
1. installation: https://nodejs.org/en/download/
2. Get started guide
    - [ ] Node API documentation https://nodejs.org/api/
    - [x] The Art of Node https://github.com/maxogden/art-of-node
    - [ ] Node School: https://nodeschool.io/
    - [x] Stream Handbook https://github.com/substack/stream-handbook#introduction
    - [x] Node style guide https://github.com/felixge/node-style-guide
    - [ ] An Introduction to libuv http://nikhilm.github.io/uvbook/introduction.html
    - [x] How to use module.exports in Node.js https://stackabuse.com/how-to-use-module-exports-in-node-js/
    - [x] Learn Node.js: A Beginner's Guide https://stackabuse.com/learn-node-js-a-beginners-guide/
    - [x] LEARN NODE (The best way to learn server-side JavaScript!) https://learnnode.com/ (video course)
3. Learn tips
    - execute node script from cmd line
    > node -pe "require.resolve('fs')"

### RabbitMQ
installation:  https://www.rabbitmq.com/install-homebrew.html
--> brew update
--> brew install rabbitmq


==> /usr/bin/unzip -qq -j /usr/local/Cellar/rabbitmq/3.7.16/plugins/rabbitmq_management-3.7.16.ez rabbitmq_management-3.7.16/priv/www/cli/rabbitmqadm
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink sbin/cuttlefish
/usr/local/sbin is not writable.

You can try again using:
  brew link rabbitmq
==> Caveats
Management Plugin enabled by default at http://localhost:15672

Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

To have launchd start rabbitmq now and restart at login:
  brew services start rabbitmq
Or, if you don't want/need a background service you can just run:
  rabbitmq-server
==> Summary
🍺  /usr/local/Cellar/rabbitmq/3.7.16: 237 files, 14.4MB, built in 3 minutes 36 seconds
==> Caveats
==> openssl@1.1
A CA file has been bootstrapped using certificates from the system
keychain. To add additional certificates, place .pem files in
  /usr/local/etc/openssl@1.1/certs

and run
  /usr/local/opt/openssl@1.1/bin/c_rehash

openssl@1.1 is keg-only, which means it was not symlinked into /usr/local,
because openssl/libressl is provided by macOS so don't link an incompatible version.

If you need to have openssl@1.1 first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl@1.1 you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

For pkg-config to find openssl@1.1 you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/openssl@1.1/lib/pkgconfig"

==> erlang
Man pages can be found in:
  /usr/local/opt/erlang/lib/erlang/man

Access them with `erl -man`, or add this directory to MANPATH.
==> rabbitmq
Management Plugin enabled by default at http://localhost:15672

Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

To have launchd start rabbitmq now and restart at login:
  brew services start rabbitmq
Or, if you don't want/need a background service you can just run:
  rabbitmq-server

run rabbit server:
/usr/local/opt/rabbitmq/sbin/ ->  /usr/local/Cellar/rabbitmq/3.7.16/sbin/

==> export PATH=$PATH:/usr/local/opt/rabbitmq/sbin
==> rabbitmq-server

  ##  ##
  ##  ##      RabbitMQ 3.7.16. Copyright (C) 2007-2019 Pivotal Software, Inc.
  ##########  Licensed under the MPL.  See https://www.rabbitmq.com/
  ######  ##
  ##########  Logs: /usr/local/var/log/rabbitmq/rabbit@localhost.log
                    /usr/local/var/log/rabbitmq/rabbit@localhost_upgrade.log

              Starting broker...
 completed with 6 plugins.

RabbitMQ Tutorials
https://www.rabbitmq.com/getstarted.html


# EMQ X
## Install and run in docker
Follow the [install](https://docs.emqx.io/en/broker/v4.3/getting-started/install.html) guide to install and run EMQX.
- Download docker image
```
docker pull emqx/emqx:4.2.11
```
- Start EMQX container
```
docker run -d --name emqx -p 1883:1883 -p 8081:8081 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:4.2.11
```
in case of starting the container end up with a ["docker name conflict"](https://stackoverflow.com/questions/31676155/docker-error-response-from-daemon-conflict-already-in-use-by-container) error, which means the container with the specified name has existed, then move on to start it with
```
docker start -i <container ID>
```
for container id, run following command to extract it 
```
docker ps -a | grep 'emqx/emqx' | awk '{print $1}'
```
to enter container shell, run following command
```
docker exec -it c58142f7fc7f  /bin/sh
```
to check running container status
```
docker ps
```

In addition, EMQX can be started from Docker Desktop. Just navigate to the dashboad screen and click on the target container / App.

## Install and run in dev machine
```
brew tap emqx/emqx                 # Add tap of EMQ X Broker
brew install emqx                  # install 
emqx start                         # start
emqx stop                          # stop
brew uninstall emqx                # uninstall
brew services start emqx/emqx/emqx # have launchd start emqx now and restart at login
emqx_ctl status                    # check emqx status
```

useful commands regarding `emqx_ctl`
```
emqx_ctl help
emqx_ctl listeners
```

in case of [ulimit](https://www.geeksforgeeks.org/ulimit-soft-limits-and-hard-limits-in-linux/) warning when running `emqx` command, change the limit of file descriptors from 256 to 1024 as suggested.
```
ulimit -n 1024
```

check emqx status
```
➜  code emqx start
EMQ X Broker 4.2.0 is started successfully!
➜  code emqx_ctl status
Node 'emqx@127.0.0.1' not responding to pings.     // Not started, maybe in is starting 
➜  code emqx start -v
EMQ X Broker 4.2.0 is started successfully!
➜  code emqx_ctl status
Node 'emqx@127.0.0.1' is started                   // started
emqx 4.2.0 is running
```

## EMQX Dashboard
Once started, navigate to EMQX dashboard portal (http://localhost:18083/) to check the management features it provides, using the default
```
username: admin
password: public
```

## EMQX [logs](https://docs.emqx.cn/broker/v4.3/getting-started/log.html)
Log is convient way to inspect what's going on (or wrong) within the running software. So it's important to learn what's being logged and where they are logged to.

Display log handlers
```
emqx_ctl log handlers list
```
outputs
```
LogHandler(id=ssl_handler, level=debug, destination=console, status=started)
LogHandler(id=file, level=warning, destination=log/emqx.log, status=started)
LogHandler(id=default, level=warning, destination=console, status=started)
```
Note that the log files resides in a log directory where emqx was installed, and the target log directory can be configured from the config file
```
# vim /usr/local/Cellar/emqx/4.2.0/etc/emqx.conf
## Where to emit the logs.
## Enable the console (standard output) logs.
##
## Value: off | file | console | both
## - off: disable logs entirely
## - file: write logs only to file
## - console: write logs only to standard I/O
## - both: write logs both to file and standard I/O
log.to = both
```

monitoring log file:
```
tail -f -n 100 /usr/local/Cellar/emqx/4.2.0/log/emqx.log.1
```

### Mosquitto
- [Installation](https://mosquitto.org/download/)
  * brew install mosquitto
- Start mosquitto
  * mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf, or
  * brew services start mosquitto
- [documentation](https://github.com/eclipse/mosquitto)

### ExpressJS
- [installation](https://expressjs.com/)
- [get started](https://expressjs.com/en/starter/installing.html)
- [express best practice: Production best practices: performance and reliability.](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Express routing](https://expressjs.com/en/guide/routing.html)
- [Path-to-RegExp](https://www.npmjs.com/package/path-to-regexp)
- [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/)
- [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Error Handling](https://expressjs.com/en/guide/error-handling.html)

### NPM
- [npm landing page](https://www.npmjs.com/)
- [npm CLI](https://docs.npmjs.com/cli-documentation/cli)
- [npm semver](https://docs.npmjs.com/misc/semver)
- [npm package](https://docs.npmjs.com/files/package.json)
- [npm config](https://docs.npmjs.com/cli/config)

### Architecture
- [ ] [The twelve-factor App](https://12factor.net/)

### References
- [x] [Building a Simple CRUD Application with Express and MongoDB](https://zellwk.com/blog/crud-express-mongodb/) 
