module.exports = [
    'util',
    '$scope',
    '$timeout',
    '$rootScope',
    'userService',
    'UibModalReset',
    function (util, $scope, $timeout, $rootScope, userService, UibModalReset) {
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
                })
        }

        vm.cancelCollect = function ($e, item) {
            $e.stopPropagation();

            UibModalReset
                .choose('取消收藏')
                .then(() => {
                    return userService.cancelCollect(item._id)
                })
                .then(() => {
                    UibModalReset.info('确认成功')
                    loadData(params)
                })
                .catch(err => {
                    // 
                    // Error catch
                    // 
                })
        }
    }
]