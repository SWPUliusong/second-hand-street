angular
    .module('app.reading', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('reading', {
                    url: '/reading',
                    abstract: true,
                    templateUrl: './templates/reading/tpls/base.html'
                })
                .state('reading.iphone', {
                    url: '^/iphone-attentions',
                    templateUrl: './templates/reading/tpls/iphone.html'
                })
                .state('reading.rules', {
                    url: '^/rules',
                    templateUrl: './templates/reading/tpls/rules.html'
                })
        }
    ])