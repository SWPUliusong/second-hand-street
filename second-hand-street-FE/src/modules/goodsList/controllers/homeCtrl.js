export default [
    'util',
    '$scope',
    'errorCatch',
    'goodsService',
    function (util, $scope, errorCatch, goodsService) {
        let vm = $scope.vm = {}

        Promise
            .all([
                goodsService.getRecent(),
                goodsService.getCollectedMost(),
                goodsService.getPvMost(),
            ])
            .then(function (res_arr) {
                // 解构赋值，view不自动更新，必须手动（？？？？？？）
                $scope.$apply(function () {
                    [{ data: vm.recentGoods }, { data: vm.collectedMostGoods }, { data: vm.pvMostGoods }] = res_arr
                })
                util.scrollTo(0)
            })
            .catch(errorCatch.modal)

        $scope.$on('goodsPublishSuccess', () => {
            goodsService
                .getRecent()
                .success(data => vm.recentGoods = data)
        })
    }
]