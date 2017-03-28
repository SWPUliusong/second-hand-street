export default [
    '$scope',
    'goodsService',
    '$stateParams',
    'UibModalReset',
    'sidebarData',
    function ($scope, goodsService, $stateParams, UibModalReset, sidebarData) {
        let vm = $scope.vm = {}

        let typeObj = _.find(sidebarData, { value: $stateParams.type })

        vm.firstLevel = _.pick(typeObj, ['name', 'value'])
        vm.secondLevel = _.find(_.get(typeObj, 'subMenu', []), { value: $stateParams.subtype })

        goodsService
            .getByTypeOrSubtype($stateParams)
            .then(res => vm.goods = _.get(res, 'data', []))
            .catch(err => UibModalReset.info(_.get(err, 'data.message', '发生未知错误')))
    }
]