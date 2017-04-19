module.exports = [
    '$scope',
    'typeData',
    '$rootScope',
    'fileUpload',
    'userService',
    'goodsDetails',
    'goodsService',
    function ($scope, typeData, $rootScope, fileUpload, userService, goodsDetails, goodsService) {

        $scope.state = 'edit'

        let vm = $scope.vm = {}
        let params = $scope.params = goodsDetails
        vm.params = _.pick($rootScope.user, ['tel', 'qq'])

        vm.type = typeData
        params.uid = _.get($rootScope, 'user._id', null)
        vm.typeItem = _.find(typeData, {"value": params.type})
        vm.subtype = _.find(vm.typeItem.subMenu, {"value": params.subtype})

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
                .catch(err => {
                    // 
                    // Error catch
                    // 
                })
        }

        vm.submit = function () {
            if (vm.isModify) {
                userService
                    .update(vm.params)
                    .catch(err => $scope.$dismiss(err))
            }

            goodsService
                .update(params)
                .then(res => $scope.$close(res))
                .catch(err => $scope.$dismiss(err))
        }
    }
]