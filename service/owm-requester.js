import axios from 'axios';
import util from 'util';
import config from '../common/app-configs.js';

function makeRequest(routeId, owmRoute, city) {
    const apiKey = config.owmApiKey
    const url = util.format(config.owmApiUrlTemplate, owmRoute, city, apiKey);

    return axios.get(url, { params: { city: city } });
}

export default {
    requestCurrent: (routeId, city) => makeRequest(routeId, 'weather', city),
    requestDaily: (routeId, city) => makeRequest(routeId, 'forecast', city)
};
