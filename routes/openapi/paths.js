'use strict';

const openapi = require('routes/openapi/openapi');

module.exports = {
    current: () => openapi.path({
        summary: 'Current weather search',
        description: 'Current weather search using given city',
        tags: ["Current weather"],
        responses: {
            200: {
                description: 'Success',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Forecast' } } }
            },
            400: {
                description: 'Bad query',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            },
            404: {
                description: 'Not found',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            },
            429: {
                description: 'Request limit exceeded',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            },
            500: {
                description: 'Internal server error',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            }
        },
        parameters: [ { $ref: '#/components/parameters/City' } ]
    }),

    daily: () => openapi.path({
        summary: 'Daily weather search',
        description: 'Daily weather search using given city',
        tags: ["Daily weather"],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: "array",
                            items: {
                                $ref: '#/components/schemas/Forecast'
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Bad query',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            },
            404: {
                description: 'Not found',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            },
            429: {
                description: 'Request limit exceeded',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            },
            500: {
                description: 'Internal server error',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } }
            }
        },
        parameters: [ { $ref: '#/components/parameters/City' } ]
    })
}
