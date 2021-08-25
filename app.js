'use strict';

const express = require('express');

const appProperties = require('common/app-properties');
const logger = require('common/logging')('app');
const openapi = require('routes/openapi/openapi');

const homeRouter = require('routes/home');
const apiRouter = require('routes/weather');

const app = express();

app.use(logger.setRequestsConsoleLogging());
app.use(logger.setRequestsFileLogging());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(openapi);
app.use('/openapi', openapi.swaggerui);
app.use('/', homeRouter);
app.use(`/api/${appProperties.getApiVersion()}`, apiRouter);

app.use(function(req, res, next) {
    res.status(404).json({message: '404 not found'});
});

app.use(function(err, req, res, next) {
    const message = err.message || 'Something goes wrong!';
    const statusCode = err.statusCode || 500;
    logger.error(err);
    res.status(statusCode).json({message: message});
});

app.listen(appProperties.getAppPort(), appProperties.getAppHost(), () => {
    logger.info(appProperties.getAppInfo());
    logger.info(`Express server listening on ${appProperties.getAppHost()}:${appProperties.getAppPort()}`);
});