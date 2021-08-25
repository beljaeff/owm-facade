'use strict';

const express = require('express');
const uuid = require('uuid');
const logger = require('common/logging')('routes/weather');
const openapiPaths = require('routes/openapi/paths');
const owmRequester = require('service/owm-requester');
const owmResponseProcessor = require('service/owm-response-processor');

const router = express.Router();

router.use(function (req, res, next) {
    if (!req.query.city) {
        logger.error('Detected weather request without city. Request: %O', req);
        throw new Error('Detected weather request without city');
    }
    next();
});

router.get('/current', openapiPaths.current(), (req, res, next) => {
    processRoute('/current', owmRequester.requestCurrent, owmResponseProcessor.processCurrent, req, res, next);
});

router.get('/daily', openapiPaths.daily(), (req, res, next) => {
    processRoute('/daily', owmRequester.requestDaily, owmResponseProcessor.processDaily, req, res, next);
});

function processRoute(route, performRequest, processOwmResponse, req, res, next) {
    const routeId = uuid.v4();
    logger.debug('Route "%s" processing initiated, routeId: "%s" assigned', route, routeId);

    performRequest(routeId, req.query.city)
        .then(result => processOwmResponse(routeId, result))
        .then(result => jsonResponse(routeId, res, result))
        .catch(error => errorResponse(next, route, routeId, error));
}

function jsonResponse(routeId, response, data) {
    logger.debug('Transmitting converted response from external service to client, routeId: "%s"', routeId);
    response.json(data);
    response.end();
}

function errorResponse(next, route, routeId, error) {
    logger.error('Error caught during "%s" route processing, routeId: "%s"', route, routeId);
    next(error);
}

module.exports = router;
