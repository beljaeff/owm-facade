import express from 'express';

import config from './common/app-configs.js';
import getLogger from './common/logging.js';
import openapi from './routes/openapi/openapi.js';

import homeRouter from './routes/home.js';
import apiRouter from './routes/weather.js';

const logger = getLogger('app');

const app = express();

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
    const message = err.message || 'Something goes wrong!';
    const statusCode = err.statusCode || 500;
    logger.error(err);
    res.status(statusCode).json({message: message});
});

app.listen(config.appPort, config.appHost, () => {
    logger.info(config.getAppInfo());
    logger.info(`Express server listening on ${config.appHost}:${config.appPort}`);
});
