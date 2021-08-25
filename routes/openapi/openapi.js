'use strict';

const openapi = require('routes/openapi/init');

require('routes/openapi/components/parameters/city');

require('routes/openapi/components/schemas/temperature');
require('routes/openapi/components/schemas/precipitation');
require('routes/openapi/components/schemas/wind');
require('routes/openapi/components/schemas/pressure');
require('routes/openapi/components/schemas/time-calculations');
require('routes/openapi/components/schemas/common-description');
require('routes/openapi/components/schemas/forecast');
require('routes/openapi/components/schemas/error-message');

module.exports = openapi;
