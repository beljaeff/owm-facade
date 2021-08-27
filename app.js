import express from 'express';
import { v4 as uuid } from 'uuid';

import config from './common/app-configs.js';
import getLogger from './common/logging.js';
import openapi from './routes/openapi/openapi.js';

import homeRouter from './routes/home.js';
import apiRouter from './routes/weather.js';

const logger = getLogger('app');

const app = express();

app.use((req, res, next) => {
    req.routeId = uuid();
    logger.debug('Registered request routeId: "%s"', req.routeId);
    next();
});

app.use(logger.setRequestsConsoleLogging());
app.use(logger.setRequestsFileLogging());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(openapi);
app.use('/openapi', openapi.swaggerui);
app.use('/', homeRouter);
app.use(`/api/${config.apiVersion}`, apiRouter);

app.use((req, res, next) => {
    res.status(404).json({message: '404 not found'});
});

app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || 'Something goes wrong!';
    if (err.isAxiosError) {
        statusCode = err?.response?.data?.cod || err?.response?.status || statusCode;
        message = err?.response?.data?.message || message;
        logger.trace(err.response);
    }
    logger.error('Error caught during route processing, routeId: "%s"', req.routeId, err);
    res.status(statusCode).json({message: message});
});

app.listen(config.appPort, config.appHost, () => {
    logger.info(config.getAppInfo());
    logger.info(`Express server listening on ${config.appHost}:${config.appPort}`);
});
