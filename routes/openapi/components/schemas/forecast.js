'use strict';

const openapi = require('routes/openapi/init');

module.exports = openapi.component('schemas', 'Forecast', {
    title: 'Forecast data',
    type: 'object',
    properties: {
        temperature: {
            type: 'object',
            $ref: '#/components/schemas/Temperature'
        },
        wind: {
            type: 'object',
            $ref: '#/components/schemas/Wind'
        },
        precipitation: {
            type: 'object',
            $ref: '#/components/schemas/Precipitation'
        },
        pressure: {
            type: 'object',
            $ref: '#/components/schemas/Pressure'
        },
        timeCalculations: {
            type: 'object',
            $ref: '#/components/schemas/TimeCalculations'
        },
        commonDescription: {
            type: 'object',
            $ref: '#/components/schemas/CommonDescription'
        }
    }
});
