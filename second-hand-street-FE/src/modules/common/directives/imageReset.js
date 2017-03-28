export default [
    function () {
        return {
            restrict: 'AE',
            scope: {
                imgData: '='
            },
            replace: true,
            templateUrl: './templates/common/image.html',
        }
    }
]