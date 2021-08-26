import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import util from 'util';
import morgan from 'morgan';
import debug from 'debug';
import appProperties from './app-properties.js';
import { getBooleanAppParam } from './functions.js';

const config = JSON.parse((await readFile(new URL('../config.json', import.meta.url))).toString());

const useRequestsConsoleLogging = getBooleanAppParam(
    process.env.OWMF_USE_REQUESTS_CONSOLE_LOGGING, config.useRequestsConsoleLogging, true
);
const useRequestsFileLogging = getBooleanAppParam(
    process.env.OWMF_USE_REQUESTS_FILE_LOGGING, config.useRequestsFileLogging, true
);

const useCommonConsoleLogging = getBooleanAppParam(
    process.env.OWMF_USE_COMMON_CONSOLE_LOGGING, config.useCommonConsoleLogging, true
);
const useCommonFileLogging = getBooleanAppParam(
    process.env.OWMF_USE_COMMON_FILE_LOGGING, config.useCommonFileLogging, true
);

const logFolder = process.env.OWMF_LOG_FOLDER || config.logFolder || dirname(fileURLToPath(import.meta.url));

const requestsLogFile = process.env.OWMF_REQUESTS_LOG_FILE || config.requestsLogFile || 'access.log';
const requestsLogStream = fs.createWriteStream(path.join(logFolder, requestsLogFile), { flags: 'a' });

const commonLogFile = process.env.OWMF_COMMON_LOG_FILE || config.commonLogFile || 'common.log';
const commonLogStream = useCommonFileLogging ?
    fs.createWriteStream(path.join(logFolder, commonLogFile), { flags: 'a' }) : null;

const appName = appProperties.getAppName();

function fileWriter() {
    commonLogStream.write(util.format.apply(util, arguments) + '\n');
}

// executes every time when requiring this module
export default function getLogger(loggingModule = 'default') {

    // executes every time when requiring this module
    function getLogDecorator(level) {

        // this decorator executes always when logging data
        return function() {
            let namespace = `${appName}:${loggingModule}:${level}`;

            if (useCommonConsoleLogging) {
                const consoleLogger = debug(namespace);
                consoleLogger.apply(null, arguments);
            }

            if (useCommonFileLogging) {
                const fileLogger = debug(namespace);
                fileLogger.log = fileWriter;
                fileLogger.useColors = false;

                // workaround because debug module formatting architecture
                const oldFormatArgs = debug.formatArgs;
                debug.formatArgs = function(args) {
                    args[0] = `${new Date().toISOString()} ${namespace} ${args[0]}`;
                }
                fileLogger.apply(null, arguments);
                debug.formatArgs = oldFormatArgs;
            }
        }
    }

    return {
        info: getLogDecorator('info'),
        debug: getLogDecorator('debug'),
        trace: getLogDecorator('trace'),
        warning: getLogDecorator('warning'),
        error: getLogDecorator('error'),

        setRequestsConsoleLogging: () => morgan('dev', {
            skip: (req, res) => !useRequestsConsoleLogging
        }),

        setRequestsFileLogging: () => morgan('combined', {
            stream: requestsLogStream,
            skip: (req, res) => !useRequestsFileLogging
        })
    }
}
