module.exports = [
    '$state',
    '$scope',
    'errorCatch',
    'userService',
    'demandService',
    function ($state, $scope, errorCatch, userService, demandService) {
        let params = $scope.params = {}
        let vm = $scope.vm = {}

        vm.params = _.pick($scope.user, ['tel', 'qq'])

        let initial = _.cloneDeep(vm.params)
        vm.change = function () {
            vm.isModify = _.some(initial, (val, key) => {
                return val !== vm.params[key]
            })
        }


        vm.submit = function () {
            if (vm.isModify) {
                userService
                    .update(vm.params)
                    .catch(errorCatch.modal)
            }

            demandService
                .publish(params)
                .then(() => {
                    history.back()
                })
                .catch(errorCatch.modal)
        }
    }
]