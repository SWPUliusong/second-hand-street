let modifyPassword = require("./popup/modifyPassword")

module.exports = [
    '$scope',
    'errorCatch',
    'fileUpload',
    'userService',
    'UibModalReset',
    function ($scope, errorCatch, fileUpload, userService, UibModalReset) {

        $scope.upload = function (file) {
            if (!file) return

            fileUpload
                .upload(file)
                .then(filename => {
                    return userService.update({
                        avatar: filename
                    })
                })
                .catch(errorCatch.modal)
        }

        $scope.modifyPassword = function () {
            UibModalReset
                .showModal({
                    title: './templates/navbar/popup/title.html',
                    size: 'sm',
                    backdrop: true,
                    templateUrl: './templates/owner/popup/modifyPassword.html',
                    controller: modifyPassword
                })
                .then(res => {
                    UibModalReset.info('修改成功')
                })
                .catch(errorCatch.modal)
        }
    }
]