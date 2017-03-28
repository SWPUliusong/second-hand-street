export default [
    '$scope',
    '$state',
    'sidebarData',
    '$location',
    function ($scope, $state, sidebarData, $location) {
        let vm = $scope.vm = {}

        vm.sidebarData = sidebarData
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