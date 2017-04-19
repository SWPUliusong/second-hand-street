module.exports = [
    function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ngModel) {
                let position = parseInt(attrs.scrollTo) || elem[0].offsetTop

                let listener;

                if (angular.isDefined(attrs.ngModel)) {
                    ngModel.$setViewValue(position);
                }
 
                listener = scope.$on("$stateChangeStart", event => {
                    document.body.scrollTop = position
                });

                scope.$on('$destroy', function () {
                    listener();
                    listener = null;
                })
            }
        }
    }
]