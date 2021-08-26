import express from 'express';
import { v4 as uuid } from 'uuid';
import getLogger from '../common/logging.js';
import openapiPaths from './openapi/paths.js';
import owmRequester from '../service/owm-requester.js';
import owmResponseProcessor from '../service/owm-response-processor.js';

const logger = getLogger('routes/weather');
const router = express.Router();

router.use((req, res, next) => {
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
    const routeId = uuid();
    logger.debug('Route "%s" processing initiated, routeId: "%s" assigned', route, routeId);

    performRequest(routeId, req.query.city)
        .then(result => processOwmResponse(routeId, result.data))
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

export { router as default };
