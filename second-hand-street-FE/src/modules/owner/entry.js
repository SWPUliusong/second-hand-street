angular
    .module('app.owner', ['app.common'])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('owner', {
                    url: '/owner',
                    abstract: true,
                    templateUrl: './templates/owner/base.html',
                    controller: require('./ctrls/baseCtrl')
                })
                .state('owner.profile', {
                    url: '/profile',
                    templateUrl: './templates/owner/profile.html',
                    controller: require('./ctrls/profileCtrl')
                })
                .state('owner.goods', {
                    url: '/goods',
                    templateUrl: './templates/owner/goods.html',
                    controller: require('./ctrls/goodsCtrl')
                })
                .state('owner.collection', {
                    url: '/collection',
                    templateUrl: './templates/owner/collection.html',
                    controller: require('./ctrls/collectionCtrl')
                })
                .state('owner.message', {
                    url: '/message',
                    templateUrl: './templates/owner/message.html',
                    controller: require('./ctrls/messageCtrl')
                })
                .state('owner.demand', {
                    url: '/demand',
                    templateUrl: './templates/owner/demand.html',
                    controller: require('./ctrls/demandCtrl')
                })
        }
    ])