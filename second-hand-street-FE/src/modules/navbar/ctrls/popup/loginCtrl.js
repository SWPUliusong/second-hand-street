export default [
    '$scope',
    'store',
    'regExp',
    'userService',
    function ($scope, store, regExp, userService) {
        let params = $scope.params = {};
        let vm = $scope.vm = {
            validEmail: false
        };
        const expires = 1000 * 60 * 60 * 24 * 7;

        let name = 'loginInfo';

        function getUser() {
            let user = store.get(name) || {}
            if (user.date && user.date + expires < Date.now()) {
                store.remove(name)
                user = {}
            }
            return user
        }

        $scope.$watch('params.email', newVal => {
            vm.validEmail = regExp.email(newVal)
        })

        _.assign(params, getUser());

        $scope.submit = function () {
            userService
                .signin(params)
                .then(res => {
                    if (vm.remember) {
                        store.set(name, _.assign({
                            date: Date.now()
                        }, params))
                    }
                    $scope.$close()
                })
                .catch(err => $scope.$dismiss(err))
        }

        vm.resetPassword = function() {
            // 发送重置密码链接
        }
    }
]