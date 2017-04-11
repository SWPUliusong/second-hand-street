import store from 'store2'

module.exports = [
    'httpConfig',
    function (httpConfig) {
        var resetKey = function (key) {
            return httpConfig.NAME + '_' + key
        };
        this.set = function (key, data) {
            store.set(resetKey(key), angular.toJson(data));
        };
        this.get = function (key) {
            try {
                return angular.fromJson(store.get(resetKey(key)));
            } catch (e) {
                store.get(resetKey(key))
            }
        };
        this.remove = function (key) {
            return store.remove(resetKey(key));
        };
    }
] 