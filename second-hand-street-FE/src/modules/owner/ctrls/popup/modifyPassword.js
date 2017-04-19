module.exports = [
    '$scope',
    'regExp',
    'userService',
    function($scope, regExp, userService) {
        let params = $scope.params = {}

        $scope.submit = function() {
            userService
                .updatePassword(params)
                .then(res => $scope.$close(res))
                .catch(err => $scope.$dismiss(err))
        }

        $scope.$watch('params.new_password', newVal => {
            $scope.validPassword = regExp.password(newVal) && params.old_password!==newVal
        })
    }
]