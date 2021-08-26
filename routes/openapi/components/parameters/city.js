import openapi from '../../init.js';

openapi.component('parameters', 'City', {
    name: 'city',
    in: 'query',
    description: 'City weather searching for',
    required: true,
    schema: {
        type: 'string'
    },
    example: 'London'
});
