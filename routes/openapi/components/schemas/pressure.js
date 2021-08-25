'use strict';

const openapi = require('routes/openapi/init');

module.exports = openapi.component('schemas', 'Pressure', {
    title: 'Pressure report',
    type: 'object',
    properties: {
        current: {
            type: 'integer',
            format: 'int32',
            example: '1030'
        },
        seaLevel: {
            type: 'integer',
            format: 'int32',
            example: '1023'
        },
        groundLevel: {
            type: 'integer',
            format: 'int32',
            example: '1032'
        }
    }
});
