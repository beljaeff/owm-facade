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
After that service will be available at `http://localhost:8080/`. To work properly, api key must be set via env variable.

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
Preferences available via environment variables.

Environment | Default | Description
---|---|:---:
OWMF_API_KEY |  | **REQUIRED**. OpenWeather API key
OWMF_HOST | localhost | App host
OWMF_PORT | 8080 | App port
OWMF_USE_REQUESTS_CONSOLE_LOGGING | true | Log requests to console or not
OWMF_USE_REQUESTS_FILE_LOGGING | true | Log requests to file or not
OWMF_USE_COMMON_CONSOLE_LOGGING | true | Transmit app log messages to console or not
OWMF_USE_COMMON_FILE_LOGGING | true | Transmit app log messages to file or not
OWMF_LOG_FOLDER | <project folder> | Folder to store app log files
OWMF_REQUESTS_LOG_FILE | access.log | Filename for requests log
OWMF_COMMON_LOG_FILE | common.log | Filename for app messages log
DEBUG |  | See Express debug module [docs](https://github.com/visionmedia/debug#readme)
NODE_ENV | dev | Profile, `dev` / `production`

For dev environment may be suitable `DEBUG=owm-facade:*`, for production environment - `DEBUG=owm-facade:*:info,owm-facade:*:error,owm-facade:*:warn`.

In production environment it is [recommended](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production) to set `NODE_ENV=production` environment variable, also doing so it will be unable to start app without setting api key (using environment too). 

## TODO
 * unit tests;
 * integration tests;
 * validation (joi/json schema/smth other);
 