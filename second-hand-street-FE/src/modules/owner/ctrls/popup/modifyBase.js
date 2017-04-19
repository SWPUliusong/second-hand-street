module.exports = [
    '$scope',
    'userService',
    function ($scope, userService) {
        let params = $scope.params = _.pick($scope.user, ['name', 'tel', 'qq'])

        let initial = _.cloneDeep(params)

        $scope.change = function () {
            $scope.isModify = _.some(initial, (val, key) => {
                return val !== params[key]
            })
        }

        $scope.submit = function() {
            userService
                .update(params)
                .then(res => $scope.$close(res))
                .catch(err => $scope.$dismiss(err))
        }
    }
]