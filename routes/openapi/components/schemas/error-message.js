import openapi from '../../init.js';

openapi.component('schemas', 'ErrorMessage', {
    title: 'Error message',
    type: 'object',
    required: [ 'message' ],
    properties: {
        message: {
            type: 'string'
        }
    }
});
