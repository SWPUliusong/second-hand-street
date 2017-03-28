export default [
    '$scope',
    'goodsService',
    function ($scope, goodsService) {
        $scope.$submit = function () {
            goodsService
                .publish({ name: 123 })
                .catch(err => $scope.$dismiss(err))
        }
    }
]