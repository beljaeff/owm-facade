import { readFile } from "fs/promises";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

function getBooleanValue(value) {
    const type = typeof value;
    if (type !== 'string') {
        throw new Error(`String expected, but '${value}' is '${type}'`);
    }

    value = value.toLowerCase();
    if (value === 'true' || value === 'yes' || value === 'y') {
        return true;
    }
    else if (value === 'false' || value === 'no' || value === 'n') {
        return false;
    }

    throw new Error(`Can't understand '${value}', should be one of true|yes|y|false|no|n`);
}

function getBooleanAppParam(envValue, defaultValue = false) {
    return typeof envValue !== 'undefined' ? getBooleanValue(envValue) : defaultValue;
}

const pkg = JSON.parse((await readFile(new URL('../package.json', import.meta.url))).toString());

const profile = process.env.NODE_ENV || 'dev';
const apiKey = process.env.OWMF_API_KEY;
if (!apiKey && profile === 'production') {
    throw new Error('OWM api key is not set');
}

const config = {

    getAppInfo: function() {
        return `${this.appName}-${this.appVersion} api ${this.apiVersion}`;
    },

    getRequestsLogPath: function() {
        return path.join(this.logFolder, this.requestsLogFile);
    },

    getCommonLogPath: function() {
        return path.join(this.logFolder, this.commonLogFile);
    },

    appHost: process.env.OWMF_HOST || "localhost",
    appPort: process.env.OWMF_PORT || "8080",
    appName: pkg.name,
    appDescription: pkg.description,
    appVersion: pkg.version,

    apiVersion: "v1",

    owmApiKey: apiKey,
    owmApiUrlTemplate: "https://api.openweathermap.org/data/2.5/%s?q=%s&appid=%s",

    useRequestsConsoleLogging: getBooleanAppParam(process.env.OWMF_USE_REQUESTS_CONSOLE_LOGGING, true),
    useRequestsFileLogging: getBooleanAppParam(process.env.OWMF_USE_REQUESTS_FILE_LOGGING, true),
    useCommonConsoleLogging: getBooleanAppParam(process.env.OWMF_USE_COMMON_CONSOLE_LOGGING, true),
    useCommonFileLogging: getBooleanAppParam(process.env.OWMF_USE_COMMON_FILE_LOGGING, true),
    logFolder: process.env.OWMF_LOG_FOLDER || dirname(fileURLToPath(import.meta.url)),
    requestsLogFile: process.env.OWMF_REQUESTS_LOG_FILE || 'access.log',
    commonLogFile: process.env.OWMF_COMMON_LOG_FILE || 'common.log',

    profile: profile
};

Object.freeze(config);

export { config as default };
