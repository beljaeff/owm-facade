import { readFile } from 'fs/promises';

//TODO: catch
const pkg = JSON.parse((await readFile(new URL('../package.json', import.meta.url))).toString());
const config = JSON.parse((await readFile(new URL('../config.json', import.meta.url))).toString());

export default {
    getAppHost: () => process.env.OWMF_HOST || config.host || "localhost",
    getAppPort: () => process.env.OWMF_PORT || config.port || "8080",

    getAppInfo: function () {
        return `${this.getAppName()}-${this.getAppVersion()} api ${this.getApiVersion()}`;
    },

    getAppName:        () => pkg.name,
    getAppDescription: () => pkg.description,
    getAppVersion:     () => pkg.version,
    getApiVersion:     () => config.apiVersion
};
