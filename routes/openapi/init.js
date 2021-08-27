import openapi from '@wesleytodd/openapi';
import config from '../../common/app-configs.js';

export default openapi({
    openapi: '3.0.0',
    info: {
        title: config.appName,
        description: config.appDescription,
        license: {
            name: "GNU General Public License, version 2",
            url: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
        },
        version: config.appVersion,
    },
    servers: [
        {
            url: `http://${config.appHost}:${config.appPort}/api/${config.apiVersion}`,
            description: "OWM facade service"
        }
    ]
});
