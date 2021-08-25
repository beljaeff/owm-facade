'use strict';

const { name, description, version } = require('package');
const config = require('config');

module.exports = {
    getAppHost: () => process.env.OWMF_HOST || config.host || "localhost",
    getAppPort: () => process.env.OWMF_PORT || config.port || "8080",

    getAppInfo: function () {
        return `${this.getAppName()}-${this.getAppVersion()} api ${this.getApiVersion()}`;
    },

    getAppName:        () => name,
    getAppDescription: () => description,
    getAppVersion:     () => version,
    getApiVersion:     () => config.apiVersion
}
