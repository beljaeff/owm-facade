import axios from 'axios';
import { readFile } from "fs/promises";
import util from 'util';

const config = JSON.parse((await readFile(new URL('../config.json', import.meta.url))).toString());

function makeRequest(routeId, owmRoute, city) {
    const apiKey = process.env.OWMF_API_KEY || config.owmApiKey
    if (!apiKey) {
        throw new Error('OWM api key is not set');
    }
    const url = util.format(config.owmApiUrlTemplate, owmRoute, city, apiKey);

    return axios.get(url, {
        params: {
            city: city
        }
    });
}

export default {
    requestCurrent: (routeId, city) => makeRequest(routeId, 'weather', city),
    requestDaily: (routeId, city) => makeRequest(routeId, 'forecast', city)
};
