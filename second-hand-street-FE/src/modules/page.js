import 'angular'
import 'lodash'
import 'uiRouter'
import 'uiBootstrap'
import 'Upload'
import 'UploadShim'
import './common/entry'
import './goodsList/entry'
import './reading'

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngFileUpload',
        'app.common',
        'app.goodsList',
        'app.reading'
    ])
    .constant('httpConfig', {
        NAME: 'second-hand-street',
        URL: '/api',
        API_VERSION: '1.0.0',
        ACCEPT: 'application/json;charset=UTF-8',
    })
    .config([
        '$httpProvider',
        '$stateProvider',
        '$urlRouterProvider',
        function ($httpProvider, $stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/home");

            $httpProvider.interceptors.push('HttpRequestInterception');

            if (!$httpProvider.defaults.headers.common) {
                $httpProvider.defaults.headers.common = {};
            }

            $httpProvider.defaults.headers.common['If-Modified-Since'] = '0';
            $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';

        }
    ])
    .run([
        '$rootScope',
        'UibModalReset',
        function ($rootScope, UibModalReset) {

            $rootScope.$on("$stateChangeStart", function (event, toState) {
                _.forEach(UibModalReset.current, function (modal) {
                    modal.dismiss();
                });
            });
        }
    ])
    .directive('navbar', require('./navbar'))
    .directive('sidebar', require('./sidebar'))
    .directive('footer', require('./footer'))  

angular.bootstrap(document, ['app'])