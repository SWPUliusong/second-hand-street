export default [
    'util',
    '$scope',
    'typeData',
    '$timeout',
    'errorCatch',
    'goodsService',
    '$stateParams',
    'UibModalReset',
    function (util, $scope, typeData, $timeout, errorCatch, goodsService, $stateParams, UibModalReset) {
        let vm = $scope.vm = {},
            params = $scope.params = _.assign({}, $stateParams, {
                page: 1,
                reduce: -1,
                sort: 'publishTime'
            });

        let typeObj = _.find(typeData, { value: $stateParams.type })

        vm.firstLevel = _.pick(typeObj, ['name', 'value'])
        vm.secondLevel = _.find(_.get(typeObj, 'subMenu', []), { value: $stateParams.subtype })

        let timer;
        _.forEach(['sort', 'reduce', 'page'], item => {
            $scope.$watch('params.' + item, function (newVal) {
                if (!newVal) return;
                // 清理timer,防止多次获取数据
                if (timer) $timeout.cancel(timer)
                timer = $timeout(() => {
                    loadData(params)
                })
            })
        })

        // 排序方式
        vm.sort = function (sort) {
            if (sort == params.sort) {
                params.reduce = 0 - params.reduce;
            } else {
                params.sort = sort
                params.reduce = -1
            }
            params.page = 1
        }

        // 加载数据
        function loadData(params) {
            goodsService
                .find(params)
                .then(res => {
                    vm.goods = _.get(res, 'data.data', []);
                    $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page'])
                    util.scrollTo(0, 200)
                })
                .catch(errorCatch.modal)
        }

        $scope.$on('goodsPublishSuccess', () => {
            if(params.page == 1) {
                loadData(params)
            }
            return
        })
    }
]