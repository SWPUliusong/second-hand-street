let modifyBase = require('./popup/modifyBase')

module.exports = [
    '$scope',
    'errorCatch',
    'UibModalReset',
    function ($scope, errorCatch, UibModalReset) {
        let vm = $scope.vm = {}

        vm.modify = function () {
            UibModalReset
                .showModal({
                    title: './templates/navbar/popup/title.html',
                    size: 'sm',
                    backdrop: true,
                    templateUrl: './templates/owner/popup/modifyBase.html',
                    controller: modifyBase
                })
                .catch(errorCatch.modal)
        }
    }
]