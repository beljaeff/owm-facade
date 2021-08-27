import fs from 'fs';
import util from 'util';
import morgan from 'morgan';
import debug from 'debug';
import config from './app-configs.js';

const requestsLogStream = fs.createWriteStream(config.getRequestsLogPath(), { flags: 'a' });
const commonLogStream = config.useCommonFileLogging ? fs.createWriteStream(config.getCommonLogPath(), { flags: 'a' }) : null;

function fileWriter() {
    commonLogStream.write(util.format.apply(util, arguments) + '\n');
}

// executes every time when requiring this module
export default function getLogger(loggingModule = 'default') {

    // executes every time when requiring this module
    function getLogDecorator(level) {

        // this decorator executes always when logging data
        return function() {
            let namespace = `${config.appName}:${loggingModule}:${level}`;

            if (config.useCommonConsoleLogging) {
                const consoleLogger = debug(namespace);
                consoleLogger.apply(null, arguments);
            }

            if (config.useCommonFileLogging) {
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
            skip: (req, res) => !config.useRequestsConsoleLogging
        }),

        setRequestsFileLogging: () => morgan('combined', {
            stream: requestsLogStream,
            skip: (req, res) => !config.useRequestsFileLogging
        })
    }
}
