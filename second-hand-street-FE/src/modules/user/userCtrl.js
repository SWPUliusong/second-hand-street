module.exports = [
    'user',
    '$scope',
    '$timeout',
    'errorCatch',
    'goodsService',
    '$stateParams',
    function (user, $scope, $timeout, errorCatch, goodsService, $stateParams) {
        let id = $stateParams.id;
        let vm = $scope.vm = {};
        let params = $scope.params = {
            status: 0,
            page: 1
        };

        vm.user = user

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
                .findByUserId(id, params)
                .then(res => {
                    vm.goods = _.get(res, 'data.data', [])
                    $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page', 'limit'])
                })
                .catch(errorCatch.modal)
        }
    }
]