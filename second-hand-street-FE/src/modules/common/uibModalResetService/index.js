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

            _.forEach(['message', 'template'], val => {
                if (opts[val]) {
                    newScope[val] = opts[val]
                }
            })

            if (opts.templateUrl) {
                getTemplateAsync(opts.templateUrl).then(function (success) {
                    newScope['template'] = success.data;
                })
            }

            let urlRegExp = /^\.\/templates(\/\S+)+\.html$/
            if (opts.title && urlRegExp.test(opts.title)) {
                getTemplateAsync(opts.title).then(function (success) {
                    newScope['title'] = success.data;
                })
            } else {
                newScope[title] = opts[title]
            }

            let size = newScope.size = _.includes(['lg', 'md', 'sm'], opts.size) ? opts.size : 'md'

            // 模态框footer部分的按钮
            newScope.needBtn = !!opts.needBtn
            // 右上角X按钮
            newScope.needClose = !!opts.needClose

            let modalInstance = $uibModal.open({
                size: size,
                templateUrl: 'templates/common/uibModalResetService/tpl.html',
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
                needBtn: false
            }, opts))
        }

        self.choose = function (title, msg, opts) {
            return self.showModal({
                title: title,
                message: msg,
                keyboard: true,
                needBtn: true
            }, opts)
        }
    }
]