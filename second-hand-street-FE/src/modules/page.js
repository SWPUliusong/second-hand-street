import 'angular'
import 'lodash'
import 'uiRouter'
import 'uiBootstrap'
import 'Upload'
import 'UploadShim'
import './common/entry'
import './goodsList/entry'
import './goodsDetails/entry'
import './reading'
import './owner/entry'
import './user/entry'
import './demand/entry'

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngFileUpload',
        'app.common',
        'app.goods.list',
        'app.goods.details',
        'app.reading',
        'app.owner',
        'app.user',
        'app.demand'
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
        'util',
        '$state',
        '$rootScope',
        'validService',
        'UibModalReset',
        function (util, $state, $rootScope, validService, UibModalReset) {
            validService.userSync()

            $rootScope.$on("$stateChangeStart", function (event, toState) {
                let flag = /^owner/.test(toState.name) || /demand\.publish/.test(toState.name)
                if ( flag && !$rootScope.user) {
                    event.preventDefault();
                    return UibModalReset.info('尚未登录')
                }

                _.forEach(UibModalReset.current, function (modal) {
                    modal.dismiss();
                });

                util.scrollTo(0)
            });

            $rootScope.$watch('user', newVal => {
                if (!newVal && ($state.includes('owner') || $state.includes('demand.publish'))) {
                    $state.go('goods.home')
                }
            })
        }
    ])
    .directive('navbar', require('./navbar'))
    .directive('sidebar', require('./sidebar'))
    .directive('footer', require('./footer'))

angular.bootstrap(document, ['app'])