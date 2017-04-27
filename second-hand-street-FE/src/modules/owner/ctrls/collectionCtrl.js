module.exports = [
    '$scope',
    '$timeout',
    '$rootScope',
    'errorCatch',
    'userService',
    'UibModalReset',
    function ($scope, $timeout, $rootScope, errorCatch, userService, UibModalReset) {
        let vm = $scope.vm = {}
        let params = $scope.params = {
            page: 1
        }

        let timer;
        $scope.$watch('params.page', function (newVal) {
            if (!newVal) return;
            // 清理timer,防止多次获取数据
            if (timer) $timeout.cancel(timer)
            timer = $timeout(() => {
                loadData(params)
            })
        })

        loadData(params);

        function loadData(params) {
            userService
                .findCollections(params)
                .then(res => {
                    vm.goods = _.get(res, 'data.data', [])
                    $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page', 'limit'])
                    if (vm.goods.length < 1 && params.page > 1) {
                        params.page--
                    }
                })
                .catch(errorCatch.modal)
        }

        vm.cancelCollect = function ($e, item) {
            $e.stopPropagation();

            UibModalReset
                .choose('确认取消收藏')
                .then(() => {
                    return userService.cancelCollect(item._id)
                })
                .then(() => loadData(params))
                .catch(errorCatch.modal)
        }
    }
]