import axios from 'axios';
import util from 'util';
import config from '../common/app-configs.js';
import getLogger from '../common/logging.js';

const logger = getLogger('service/owm-requester');

const dataMapper = {
    weather: function(source) {
        return {
            temperature: {
                current: source?.main?.temp,
                min: source?.main?.temp_min,
                max: source?.main?.temp_max,
                feelsLike: source?.main?.feels_like
            },
            precipitation: {
                humidity: source?.main?.humidity,
                visibility: source.visibility,
                clouds: source?.clouds?.all,
                rainOneHour: source?.rain?.['1h'],
                rainThreeHours: source?.rain?.['3h'],
                snowOneHour: source?.snow?.['1h'],
                snowThreeHours: source?.snow?.['3h']
            },
            wind: {
                speed: source?.wind?.speed,
                direction: source?.wind?.deg,
                gust: source?.wind?.gust
            },
            pressure: {
                current: source?.main?.pressure,
                seaLevel: source?.main?.sea_level,
                groundLevel: source?.main?.grnd_level
            },
            commonDescription: {
                title: source?.weather?.[0]?.main,
                description: source?.weather?.[0]?.description,
                icon: source?.weather?.[0]?.icon
            },
            timeCalculations: {
                sunrise: source?.sys?.sunrise,
                sunset: source?.sys?.sunset,
                calculationTime: source.dt
            }
        }
    },

    forecast: function(source) {
        return Array.isArray(source.list) ? source.list.map(this.weather) : [];
    }
}

export default {
    getData: async function(owmPath, city, routeId) {
        const apiKey = config.owmApiKey
        const url = util.format(config.owmApiUrlTemplate, owmPath, city, apiKey);

        logger.debug('Performing request "%s", routeId: "%s"', url, routeId);
        const response = await axios.get(url, { params: { city: city } });

        logger.trace('Received external service response "%O", routeId: "%s"', response, routeId);

        logger.debug('Converting response from external service to common model, routeId: "%s"', routeId);
        return dataMapper[owmPath](response.data);
    }
};
