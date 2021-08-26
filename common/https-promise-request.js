import https from 'https';
import getLogger from './logging.js';

const logger = getLogger('common/https-promise-request');

function badStatus(res) {
    return res.statusCode < 200 || res.statusCode >= 300;
}

function addBadStatusMessage(error, res, routeId) {
    if (badStatus(res)) {
        logger.error('Bad status code from external service detected, routeId: "%s"', routeId);
        logger.trace('Response: %O', res);
        error.message = `Received bad status code from external service: ${res.statusCode}. ${error.message}`;
    }
}

function processBadStatus(res, body, routeId, reject) {
    const message = body.message || 'Bad status code from external service detected';
    const error = new Error(message);
    error.statusCode = res.statusCode;
    logger.error('%s, status code: "%s", routeId: "%s"', message, res.statusCode, routeId);
    reject(error);
}

export default function httpsPromiseRequest(routeId, options) {
    return new Promise(function(resolve, reject) {
        logger.debug('Performing external service request, routeId: "%s"', routeId);
        const req = https.request(options, function(res) {
            // accumulate data
            let body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });

            // resolve on end
            res.on('end', function() {
                logger.debug(
                    'Received "%s" response from external service with status code "%s", routeId: "%s"',
                    res.headers['content-type'], res.statusCode, routeId
                );

                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(error) {
                    addBadStatusMessage(error, res, routeId);
                    logger.error('Error parsing json from external service response body, routeId: "%s". Raw body: %O', routeId, body);
                    reject(error);
                    return;
                }

                if (badStatus(res)) {
                    processBadStatus(res, body, routeId, reject);
                    return;
                }

                logger.debug('Successful received and processed data from external service, routeId: "%s". Result: %O', routeId, body);
                resolve(body);
            });
        });

        // reject on request error
        req.on('error', function(error) {
            logger.error('Error requesting external service, routeId: "%s"', routeId);
            reject(error);
        });

        // we must end request
        req.end();
    });
}
