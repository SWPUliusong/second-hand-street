module.exports = [
    '$scope',
    '$timeout',
    'errorCatch',
    'demandService',
    function($scope, $timeout, errorCatch, demandService) {
        let vm = $scope.vm = {}
        let params = $scope.params = {
            page: 1
        }

        // 防止多次加载
        let timer;
        function loadData() {
            if (timer) $timeout.cancel(timer)
            timer = $timeout(() => {
                demandService
                    .findById($scope.user._id, params)
                    .then(res => {
                        vm.demand = res.data.data
                        $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page', 'limit'])

                        if (vm.demand.length < 1 && params.page > 1) {
                            params.page--
                        }
                    })
            })
        }

        // 随页码变化加载数据
        $scope.$watch('params.page', loadData)


        // 删除需求信息
        vm.delete = id => {
            demandService
                .remove(id)
                .then(loadData)
                .catch(errorCatch.modal)
        }
    }
]