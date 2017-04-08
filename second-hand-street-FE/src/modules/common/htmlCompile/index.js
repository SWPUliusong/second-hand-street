export default [
    '$compile',
    function($compile) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.htmlCompile, function(newVal) {
                    elem.html(newVal)
                    $compile(elem.contents())(scope)
                })
            }
        }
    }
]