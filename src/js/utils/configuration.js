import Tools from './tools';

const globalConfig = window.crafterSocial_cfg;

export default {
    ...globalConfig,

    get(key) {
        return this[key];
    },

    getAPIUrl(path, values) {
        const base = this.get('url.service.api');
        return Tools.format(`${base}${path}`, values, true);
    }
};