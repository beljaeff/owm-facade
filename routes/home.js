'use strict';

const express = require('express');
const appProperties = require('common/app-properties');

const router = express.Router();

router.get('/', function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.end(appProperties.getAppInfo());
});

module.exports = router;
