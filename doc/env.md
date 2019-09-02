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
    - [ ] Stream Handbook https://github.com/substack/stream-handbook#introduction
    - [x] Node style guide https://github.com/felixge/node-style-guide
    - [ ] An Introduction to libuv http://nikhilm.github.io/uvbook/introduction.html
    - [x] How to use module.exports in Node.js https://stackabuse.com/how-to-use-module-exports-in-node-js/
    - [ ] Learn Node.js: A Beginner's Guide https://stackabuse.com/learn-node-js-a-beginners-guide/
    - [ ] LEARN NODE (The best way to learn server-side JavaScript!) https://learnnode.com/ (video course)
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


### EMQ X
Installation: 
https://docs.emqx.io/docs/broker/v3/cn/install.html#macos
https://www.emqx.io/downloads#broker

Install steps:
- $ brew tap emqx/emqx
- $ brew install emqx

Start emqx
- $ emqx start
> emqx 3.1.0 is started successfully!
- brew services start emqx/emqx/emqx
- $ emqx_ctl status
> Node 'emqx@127.0.0.1' is started emqx v3.1.0 is running

==> mkdir -p /usr/local/Cellar/emqx/3.2.2/data/configs
==> Caveats
To have launchd start emqx/emqx/emqx now and restart at login:
  brew services start emqx/emqx/emqx
Or, if you don't want/need a background service you can just run:
  emqx

➜  Downloads emqx start
emqx v3.2.1 is started successfully!

### Mosquitto
- Installation https://mosquitto.org/download/
  * brew install mosquitto
- Start mosquitto
  * mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf, or
  * brew services start mosquitto
- documentation https://github.com/eclipse/mosquitto

### ExpressJS
- installation https://expressjs.com/
- get started https://expressjs.com/en/starter/installing.html
- express best practice: Production best practices: performance and reliability. https://expressjs.com/en/advanced/best-practice-performance.html

### NPM
- npm landing page https://www.npmjs.com/
- npm CLI https://docs.npmjs.com/cli-documentation/cli
- npm semver https://docs.npmjs.com/misc/semver
- npm package https://docs.npmjs.com/files/package.json
- npm config https://docs.npmjs.com/cli/config

