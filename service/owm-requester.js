import { readFile } from "fs/promises";
import util from 'util';
import httpsPromiseRequest from '../common/https-promise-request.js';

const config = JSON.parse((await readFile(new URL('../config.json', import.meta.url))).toString());

function getOwmOptions(owmRoute, city) {
    const apiKey = process.env.OWMF_API_KEY || config.owmApiKey
    if (!apiKey) {
        throw new Error("OWM api key is not set");
    }
    return {
        host: config.owmApiHost,
        port: config.owmApiPort,
        path: util.format(config.owmPathTemplate, owmRoute, city, apiKey),
        method: config.owmApiMethod,
        headers: { 'Content-Type': 'application/json' }
    };
}

export default {
    requestCurrent: (routeId, city) => httpsPromiseRequest(routeId, getOwmOptions('weather', city)),
    requestDaily: (routeId, city) => httpsPromiseRequest(routeId, getOwmOptions('forecast', city))
};
