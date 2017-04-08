import navbarCtrl from './ctrls'

module.exports = function () {
    return {
        restrict: 'AE',
        scope: {},
        replace: true,
        templateUrl: './templates/navbar/tpl.html',
        controller: navbarCtrl
    }
}