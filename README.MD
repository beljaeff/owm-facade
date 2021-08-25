# Facade for OpenWeather 

A microservice ([Express](https://github.com/expressjs/express/)) retrieving current / daily (5 day / 3 hours) forecast data from [OpenWeather](https://openweathermap.org) via [OpenWeather API](https://openweathermap.org/api).
Provides REST/JSON API. Designed to run in the container environment. 

Provides [OpenAPI](https://github.com/OAI/OpenAPI-Specification/) documentation.

[API key](https://openweathermap.org/price) needed for accessing [OpenWeather API](https://openweathermap.org/api).

## Usage
### Local
To start service in dev environment execute:
```shell script
$ npm i
$ npm start
```
After that service will be available at `http://localhost:8080/`.

### Docker
Build image:
```shell script
$ docker build -t owm-facade .
```

Start container:
```shell script
$ docker run --name owm-facade -d -e OWMF_API_KEY=<API key> -p 8080:8080 owm-facade
```

Liveness/readiness probe: `http://localhost:8080`

OpenAPI: `http://localhost:8080/openapi`

## Preferences
Preferences available via environment variables (first precedence) and `congig.json` (second precedence).

Environment | `config.json` | Default | Description
---|---|---|:---:
OWMF_API_KEY | `owmApiKey` |  | **REQUIRED**. OpenWeather API key
OWMF_HOST | `host` | localhost | App host
OWMF_PORT | `port` | 8080 | App port
OWMF_USE_REQUESTS_CONSOLE_LOGGING | `useRequestsConsoleLogging` | true | Log requests to console or not
OWMF_USE_REQUESTS_FILE_LOGGING | `useRequestsFileLogging` | true | Log requests to file or not
OWMF_USE_COMMON_CONSOLE_LOGGING | `useCommonConsoleLogging` | true | Transmit app log messages to console or not
OWMF_USE_COMMON_FILE_LOGGING | `useCommonFileLogging` | true | Transmit app log messages to file or not
OWMF_LOG_FOLDER | `logFolder` |  | Folder to store app log files
OWMF_REQUESTS_LOG_FILE | `requestsLogFile` | access.log | Filename for requests log
OWMF_COMMON_LOG_FILE | `commonLogFile` | common.log | Filename for app messages log
DEBUG |  |  |  See Express debug module [docs](https://github.com/visionmedia/debug#readme)

For dev environment may be suitable `DEBUG=owm-facade:*`, for production environment - `DEBUG=owm-facade:*:info,owm-facade:*:error,owm-facade:*:warn`;

## TODO
 * unit tests;
 * integration tests;
 * validation (joi/json schema/smth other);