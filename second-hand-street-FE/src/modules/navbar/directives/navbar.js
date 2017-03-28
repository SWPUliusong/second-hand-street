import navbarCtrl from '../controllers/navbarCtrl'

export default [
    function () {
        return {
            restrict: 'AE',
            scope: {},
            replace: true,
            templateUrl: './templates/navbar/navbar.html',
            controller: navbarCtrl
        }
    }
]