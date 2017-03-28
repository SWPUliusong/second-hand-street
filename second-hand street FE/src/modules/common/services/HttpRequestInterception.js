export default [
    'httpConfig',
    function (httpConfig) {

        this.request = function (config) {
            let methodKey = config.method.toLocaleUpperCase().split('_');

            if (methodKey.length > 1) {
                config.method = methodKey[0];
                config.url = httpConfig.URL + config.url;
                config.headers['api-version'] = httpConfig.API_VERSION;
                config.headers['Accept'] = httpConfig.ACCEPT;
            }

            return config
        }
    }
]