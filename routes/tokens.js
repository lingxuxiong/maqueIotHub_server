const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const router = require('express').Router();

router.use(function logTime(_, _, next) {
    console.log(`handling auth token, time: ${Date.now()}`);
    next();
});

router.post('/', function (_, res) {
    var userName = shortid.generate();
    var password = jwt.sign({
        userName: userName,
        expires: Math.floor(Date.now() / 1000) + 10 * 60
    }, process.env.JWT_SECRET);

    res.json({
        userName: userName,
        password: password
    });
});

module.exports = router;
