'use strict';

const openapi = require('routes/openapi/init');

module.exports = openapi.component('schemas', 'Wind', {
    title: 'Wind report',
    type: 'object',
    properties: {
        speed: {
            type: 'number',
            format: 'float',
            example: '1.54'
        },
        direction: {
            type: 'integer',
            format: 'int32',
            example: '10'
        },
        gust: {
            type: 'number',
            format: 'float',
            example: '10.4'
        }
    }
});
