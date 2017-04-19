module.exports = [
    '$scope',
    '$timeout',
    'commentService',
    function ($scope, $timeout, commentService) {
        let vm = $scope.vm = {}
        let params = $scope.params = {
            isRead: false,
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
        $scope.$watch('params.isRead', function (newVal) {
            if (timer) $timeout.cancel(timer)
            timer = $timeout(() => {
                loadData(params)
            })
        })

        function loadData(params) {
            commentService
                .findByUser(params)
                .then(res => {
                    vm.message = _.get(res, 'data.data', [])
                    $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page', 'limit'])
                })
        }

        vm.changeRead = function () {
            if (params.isRead === false) {
                delete params.isRead
            } else {
                params.isRead = false
            }
            params.page = 1
        }
    }
]