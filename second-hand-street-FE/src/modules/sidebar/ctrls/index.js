export default [
    '$scope',
    '$state',
    'typeData',
    '$location',
    function ($scope, $state, typeData, $location) {
        let vm = $scope.vm = {}

        vm.sidebarData = typeData
        vm.isCurrentType = type => $location.$$search.type === type
        vm.isCurrentSubtype = (type, subtype) => {
            return $location.$$search.subtype === subtype &&
                $location.$$search.type === type
        }
        
        vm.junmpPageTo = function ($event, type, subtype) {
            $event.stopPropagation();
            $state.go('goods.type', {
                type: type,
                subtype: subtype
            })
        }
    }
]