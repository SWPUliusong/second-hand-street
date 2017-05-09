let demandCtrl = require('./demandCtrl')
let publishCtrl = require('./publishCtrl')

angular
    .module('app.demand', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('demand', {
                    url: '/demand',
                    abstract: true,
                    template: '<ui-view />'
                })
                .state('demand.list', {
                    url: '/list',
                    templateUrl: './templates/demand/tpl.html',
                    controller: demandCtrl
                })
                .state('demand.publish', {
                    url: '/publish',
                    templateUrl: './templates/demand/publish.html',
                    controller: publishCtrl
                })
        }
    ])