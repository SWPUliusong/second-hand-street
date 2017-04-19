let detailsCtrl = require("./detailsCtrl")

angular
    .module('app.goods.details', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('goods.details', {
                    url: '/:id',
                    templateUrl: './templates/goodsDetails/details.html',
                    controller: detailsCtrl,
                    resolve: {
                        goodsDetails: [
                            '$q',
                            '$stateParams',
                            'goodsService',
                            function ($q, $stateParams, goodsService) {
                                let defer = $q.defer()
                                goodsService
                                    .findById($stateParams.id)
                                    .then(res => {
                                        defer.resolve(res.data)
                                    })

                                return defer.promise
                            }
                        ]
                    }
                })
        }
    ])