import navbarCtrl from './ctrls'

module.exports = function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: './templates/navbar/tpl.html',
        controller: navbarCtrl
    }
}