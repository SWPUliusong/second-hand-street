export default [
    '$scope',
    function($scope) {
        $scope.$submit = function() {
            console.log($scope.params)
        }
    }
]