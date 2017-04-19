export default [
    'httpConfig',
    function (httpConfig) {

        this.request = function (config) {

            if (!/\.html$/.test(config.url) && !/^http/.test(config.url)) {
                config.url = httpConfig.URL + config.url;
                config.headers['api-version'] = httpConfig.API_VERSION;
                config.headers['Accept'] = httpConfig.ACCEPT;
            }

            return config
        }
    }
]