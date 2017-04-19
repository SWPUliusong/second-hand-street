let modifyBase = require('./popup/modifyBase')

module.exports = [
    '$scope',
    'UibModalReset',
    function ($scope, UibModalReset) {
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
                .catch(err => {
                    // 
                    // Error catch
                    // 
                })
        }
    }
]