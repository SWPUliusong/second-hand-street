let editCtrl = require("./popup/editCtrl")

module.exports = [
    '$scope',
    '$timeout',
    '$rootScope',
    'errorCatch',
    'goodsService',
    'UibModalReset',
    function ($scope, $timeout, $rootScope, errorCatch, goodsService, UibModalReset) {
        let vm = $scope.vm = {}
        let params = $scope.params = {
            status: 0,
            page: 1
        }

        let timer;
        _.forEach(['status', 'page'], item => {
            $scope.$watch('params.' + item, function (newVal) {
                if (!newVal && newVal !== 0) return;
                // 清理timer,防止多次获取数据
                if (timer) $timeout.cancel(timer)
                timer = $timeout(() => {
                    loadData(params)
                })
            })
        })

        loadData(params);

        function loadData(params) {
            goodsService
                .findByUserId($rootScope.user._id, params)
                .then(res => {
                    vm.goods = _.get(res, 'data.data', [])
                    $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page', 'limit'])
                    if (vm.goods.length < 1 && params.page > 1) {
                        params.page--
                    }
                })
                .catch(errorCatch.modal)
        }

        vm.soldOut = function ($e, item) {
            $e.stopPropagation();

            UibModalReset
                .choose('确认商品已售出')
                .then(() => {
                    return goodsService.changeStatus(item._id)
                })
                .then(() => {
                    UibModalReset.info('确认成功')
                    loadData(params)
                })
                .catch(errorCatch.modal)
        }

        vm.delete = function ($e, item) {
            $e.stopPropagation();

            UibModalReset
                .choose('确认删除商品')
                .then(() => {
                    return goodsService.delete(item._id)
                })
                .then(() => {
                    UibModalReset.info('删除成功')
                    loadData(params)
                })
                .catch(errorCatch.modal)
        }

        vm.edit = function ($e, item) {
            $e.stopPropagation();

            UibModalReset
                .showModal({
                    title: './templates/navbar/popup/title.html',
                    backdrop: true,
                    templateUrl: './templates/navbar/popup/publish.html',
                    controller: editCtrl,
                    resolve: {
                        goodsDetails: [
                            'errorCatch',
                            'goodsService',
                            function (errorCatch, goodsService) {
                                return goodsService
                                    .findById(item._id)
                                    .then(res => res.data)
                                    .catch(errorCatch.modal)
                            }
                        ]
                    }
                })
                .then(() => loadData(params))
                .catch(errorCatch.modal)
        }

        $scope.$on('goodsPublishSuccess', () => loadData(params))
    }
]