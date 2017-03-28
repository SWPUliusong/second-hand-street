export default [
    '$http',
    '$uibModal',
    '$rootScope',
    '$templateCache',
    function ($http, $uibModal, $rootScope, $templateCache) {
        let self = this
        let getTemplateAsync = function (url) {
            return $http({
                method: 'GET',
                url: url,
                cache: $templateCache
            })
        }

        // 存储当前所有打开的模态框
        self.current = []

        self.showModal = function (opts) {
            let newScope = $rootScope.$new()

            _.forEach(['title', 'message', 'template'], val => {
                if (opts[val]) {
                    newScope[val] = opts[val]
                }
            })

            if (opts.templateUrl) {
                getTemplateAsync(opts.templateUrl).then(function (success) {
                    newScope['template'] = success.data;
                })
            }

            let size = newScope.size = _.includes(['lg', 'md', 'sm'], opts.size) ? opts.size : 'md'

            newScope.needBottomBtn = !!opts.needBottomBtn

            let modalInstance = $uibModal.open({
                size: size,
                templateUrl: 'templates/common/popup/modal-alert.html',
                backdrop: !!opts.backdrop,
                keyboard: !!opts.keyboard,
                scope: newScope,
                controller: opts.controller,
                resolve: opts.resolve
            })

            self.current = _.filter(self.current, obj => !_.get(obj, 'result.$$state.status'))

            self.current.push(modalInstance)

            return modalInstance.result
        }

        self.info = function (msg, opts) {
            return self.showModal(_.assign({
                size: 'sm',
                title: '提示',
                message: msg,
                backdrop: true,
                keyboard: true,
                needBottomBtn: false
            }, opts))
        }

        self.choose = function (title, msg, opts) {
            return self.showModal({
                title: title,
                message: msg,
                needBottomBtn: true
            }, opts)
        }
    }
]