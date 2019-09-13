const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const router = require('express').Router();

// secret value must be the same as defined in the jwt plugin config file
// etc/plugins/emqx_auth_jwt.conf, which looks like
// auth.jwt.secret = emqxsecret
const SECRET = 'emqxsecret';

router.post('/', function (_, res) {
    var userName = shortid.generate();
    var password = jwt.sign({
        userName: userName,
        expires: Math.floor(Date.now() / 1000) + 10 * 60
    }, SECRET);

    res.json({
        userName: userName,
        password: password
    });
});

module.exports = router;
