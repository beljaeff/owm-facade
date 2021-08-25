'use strict';

const openapi = require('routes/openapi/init');

module.exports = openapi.component('schemas', 'TimeCalculations', {
    title: 'Sunrise, sunset and time report calculated',
    type: 'object',
    properties: {
        sunrise: {
            type: 'integer',
            format: 'int64',
            example: '1560343627'
        },
        sunset: {
            type: 'integer',
            format: 'int64',
            example: '1560396563'
        },
        calculationTime: {
            type: 'integer',
            format: 'int64',
            example: '1560350645'
        }
    }
});
