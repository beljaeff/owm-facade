import express from 'express';
import getLogger from '../common/logging.js';
import openapiPaths from './openapi/paths.js';
import owmService from '../service/owm-service.js';

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
    processRoute('weather', '/current', req, res, next);
});

router.get('/daily', openapiPaths.daily(), (req, res, next) => {
    processRoute('forecast', '/daily', req, res, next);
});

function processRoute(owmPath, route, req, res, next) {
    const city = req.query.city;
    const routeId = req.routeId;
    logger.debug('Route "%s" processing initiated (city: "%s"), routeId: "%s"', route, city, routeId);
    owmService
        .getData(owmPath, city, req.routeId)
        .then(result => {
            logger.debug('Transmitting converted response from external service to client, routeId: "%s"', routeId);
            res.json(result);
            res.end();
        })
        .catch(error => next(error));
}

export { router as default };
