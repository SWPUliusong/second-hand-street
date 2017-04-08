import sidebarCtrl from './ctrls'

module.exports = function () {
    return {
        restrict: 'AE',
        scope: {},
        replace: true,
        templateUrl: './templates/sidebar/tpl.html',
        controller: sidebarCtrl
    }
}