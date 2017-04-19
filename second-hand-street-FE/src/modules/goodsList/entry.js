import homeCtrl from './controllers/homeCtrl'
import showByTypeCtrl from './controllers/showByType'

angular
    .module('app.goods.list', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('goods', {
                    url: '/goods',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('goods.home', {
                    url: '^/home',
                    templateUrl: './templates/goodsList/home.html',
                    controller: homeCtrl
                })
                .state('goods.type', {
                    url: '?type&subtype',
                    templateUrl: './templates/goodsList/showByType.html',
                    controller: showByTypeCtrl
                })
        }
    ])