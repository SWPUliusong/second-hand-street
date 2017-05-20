module.exports = [
    '$scope',
    '$timeout',
    'errorCatch',
    'UibModalReset',
    'commentService',
    function ($scope, $timeout, errorCatch, UibModalReset, commentService) {
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
                    if (vm.message.length < 1 && params.page > 1) {
                        params.page--
                    }
                })
                .catch(errorCatch.modal)
        }

        vm.changeRead = function () {
            if (params.isRead === false) {
                delete params.isRead
            } else {
                params.isRead = false
            }
            params.page = 1
        }

        vm.delete = function (id) {
            UibModalReset
                .choose('是否删除此条消息')
                .then(() => {
                    return commentService.deleteByUser(id)
                })
                .then(() => loadData(params))
                .catch(errorCatch.modal)
        }
    }
]