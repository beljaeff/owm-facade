import openapi from '../../init.js';

openapi.component('schemas', 'CommonDescription', {
    title: 'Summary data to show',
    type: 'object',
    properties: {
        title: {
            type: 'string',
            example: 'Clouds'
        },
        description: {
            type: 'string',
            example: 'few clouds'
        },
        icon: {
            type: 'string',
            example: '02n'
        }
    }
});
