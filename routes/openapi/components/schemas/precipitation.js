import openapi from '../../init.js';

openapi.component('schemas', 'Precipitation', {
    title: 'Rain, snow, clouds, humidity and visibility',
    type: 'object',
    properties: {
        humidity: {
            type: 'integer',
            format: 'int32',
            example: '84'
        },
        visibility: {
            type: 'integer',
            format: 'int32',
            example: '1000'
        },
        clouds: {
            type: 'integer',
            format: 'int32',
            example: '1'
        },
        rainOneHour: {
            type: 'number',
            format: 'float',
            example: '0.2'
        },
        rainThreeHours: {
            type: 'number',
            format: 'float',
            example: '0.5'
        },
        snowOneHour: {
            type: 'number',
            format: 'float',
            example: '3.3'
        },
        snowThreeHours: {
            type: 'number',
            format: 'float',
            example: '4.5'
        }
    }
});
