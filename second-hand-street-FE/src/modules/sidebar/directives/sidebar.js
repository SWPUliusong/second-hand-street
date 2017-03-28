import sidebarCtrl from '../controllers/sidebarCtrl'

export default [
    function () {
        return {
            restrict: 'AE',
            scope: {},
            replace: true,
            templateUrl: './templates/sidebar/sidebar.html',
            controller: sidebarCtrl
        }
    }
]