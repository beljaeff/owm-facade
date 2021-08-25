'use strict';

const openapi = require('routes/openapi/init');

module.exports = openapi.component('schemas', 'ErrorMessage', {
    title: 'Error message',
    type: 'object',
    required: [ 'message' ],
    properties: {
        message: {
            type: 'string'
        }
    }
});
