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
                            'errorCatch',
                            '$stateParams',
                            'goodsService',
                            function (errorCatch, $stateParams, goodsService) {
                                return goodsService
                                    .findById($stateParams.id)
                                    .then(res => res.data)
                                    .catch(errorCatch.modal)
                            }
                        ]
                    }
                })
        }
    ])