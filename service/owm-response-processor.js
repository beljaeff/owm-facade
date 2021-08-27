import getLogger from '../common/logging.js';

const logger = getLogger('service/owm-response-processor');

function mapForecast(source) {
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
}

function mapForecasts(source) {
    return Array.isArray(source.list) ? source.list.map(mapForecast) : [];
}

function processResponse(map, routeId, response) {
    return new Promise(resolve => {
        logger.debug('Converting response from external service to common model, routeId: "%s"', routeId);
        resolve(map(response));
    });
}

export default {
    processCurrent: (routeId, response) => processResponse(mapForecast, routeId, response),
    processDaily: (routeId, response) => processResponse(mapForecasts, routeId, response)
};
