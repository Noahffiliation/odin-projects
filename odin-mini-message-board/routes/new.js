var express = require('express');
const rateLimit = require('express-rate-limit');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('form');
});

module.exports = router;
