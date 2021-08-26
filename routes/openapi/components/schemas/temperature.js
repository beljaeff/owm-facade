import openapi from '../../init.js';

openapi.component('schemas', 'Temperature', {
    title: 'Temperature report',
    type: 'object',
    properties: {
        current: {
            type: 'number',
            format: 'float',
            example: '286.42'
        },
        min: {
            type: 'number',
            format: 'float',
            example: '284.34'
        },
        max: {
            type: 'number',
            format: 'float',
            example: '287.75'
        },
        feelsLike: {
            type: 'number',
            format: 'float',
            example: '286'
        }
    }
});
