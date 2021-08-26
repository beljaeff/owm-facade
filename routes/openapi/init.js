import openapi from '@wesleytodd/openapi';
import appProperties from '../../common/app-properties.js';

export default openapi({
    openapi: '3.0.0',
    info: {
        title: appProperties.getAppName(),
        description: appProperties.getAppDescription(),
        license: {
            name: "GNU General Public License, version 2",
            url: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
        },
        version: appProperties.getAppVersion(),
    },
    servers: [
        {
            url: `http://${appProperties.getAppHost()}:${appProperties.getAppPort()}/api/${appProperties.getApiVersion()}`,
            description: "OWM facade service"
        }
    ]
});
