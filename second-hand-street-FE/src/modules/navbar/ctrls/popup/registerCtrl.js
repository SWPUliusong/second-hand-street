export default [
    '$scope',
    'regExp',
    'userService',
    'validService',
    function ($scope, regExp, userService, validService) {
        let params = $scope.params = {};
        let vm = $scope.vm = {
            validEmail: false,
            validPassword: false,
            emailRepeat: false
        };

        $scope.$watch('params.email', newVal => {
            vm.validEmail = regExp.email(newVal)
        })
        $scope.$watch('params.password', newVal => {
            vm.validPassword = regExp.password(newVal)
        })

        // 验证邮箱是否已注册
        vm.validRepeat = function() {
            if (!params.email) return
            validService
                .email(params.email)
                .then(isRepeat)
        }

        function isRepeat(res) {
            let flag = res.data.flag
            vm.validEmail = !flag
            vm.emailRepeat = flag
        }

        $scope.submit = function () {
            userService
                .register(params)
                .then(() => $scope.$close())
                .catch(err => $scope.$dismiss(err))
        }
    }
]