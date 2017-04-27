module.exports = [
    '$scope',
    'typeData',
    '$rootScope',
    'fileUpload',
    'userService',
    'goodsService',
    function ($scope, typeData, $rootScope, fileUpload, userService, goodsService) {
        let vm = $scope.vm = {}
        let params = $scope.params = {}
        params.images = []
        vm.params = _.pick($rootScope.user, ['tel', 'qq'])

        params.uid = _.get($rootScope, 'user._id', null)
        vm.type = typeData

        let initial = _.cloneDeep(vm.params)
        vm.change = function () {
            vm.isModify = _.some(initial, (val, key) => {
                return val !== vm.params[key]
            })
        }

        $scope.upload = function (file) {
            if (!file) return

            fileUpload
                .upload(file)
                .then(filename => {
                    params.images.push(filename)
                })
        }

        vm.submit = function () {
            if (vm.isModify) {
                userService
                    .update(vm.params)
                    .catch(err => $scope.$dismiss(err))
            }

            goodsService
                .publish(params)
                .then(res => $scope.$close(res))
                .catch(err => $scope.$dismiss(err))
        }
    }
]