'use strict';

const util = require('util');
const config = require('config');
const httpsPromiseRequest = require('common/https-promise-request');

function getOwmOptions(owmRoute, city) {
    const apiKey = process.env.OWMF_API_KEY || config.owmApiKey
    if (!apiKey) {
        throw new Error("OWM api key is not set");
    }
    return {
        host: config.owmApiHost,
        port: config.owmApiPort,
        path: util.format(config.owmPathTemplate, owmRoute, city, apiKey),
        method: config.owmApiMethod,
        headers: { 'Content-Type': 'application/json' }
    };
}

module.exports = {
    requestCurrent: (routeId, city) => httpsPromiseRequest(routeId, getOwmOptions('weather', city)),
    requestDaily: (routeId, city) => httpsPromiseRequest(routeId, getOwmOptions('forecast', city))
}
