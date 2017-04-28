import loginCtrl from './popup/loginCtrl'
import registerCtrl from './popup/registerCtrl'
let publishCtrl = require("./popup/publishCtrl")

export default [
    '$scope',
    '$http',
    '$document',
    '$rootScope',
    'errorCatch',
    'userService',
    'goodsService',
    'UibModalReset',
    function ($scope, $http, $document, $rootScope, errorCatch, userService, goodsService, UibModalReset) {
        let vm = $scope.vm = {
            isShowFeedback: false
        }


        let params = $scope.params = {}

        vm.search = function ($e) {
            if (!params.keyword) {
                if (vm.isShowFeedback) vm.isShowFeedback = false;
                return
            }
            // 跳转查询结果页面
            if ($e.key == 'Enter') {
                return
            }

            // 实时反馈
            goodsService
                .find(_.pick(params, ['keyword']))
                .success(function (res) {
                    vm.isShowFeedback = true
                    vm.goods = res
                })
        }

        $document.on('click', function () {
            if (vm.isShowFeedback) {
                $scope.$apply(function () {
                    vm.isShowFeedback = false
                });
            }
        })

        // 登录
        vm.login = function () {
            UibModalReset
                .showModal({
                    title: './templates/navbar/popup/title.html',
                    size: 'sm',
                    backdrop: true,
                    templateUrl: './templates/navbar/popup/login.html',
                    controller: loginCtrl
                })
                .catch(errorCatch.modal)
        }

        // 退出
        vm.logout = function () {
            userService
                .signout()
                .catch(errorCatch.modal)
        }

        // 注册
        vm.register = function () {
            UibModalReset
                .showModal({
                    title: './templates/navbar/popup/title.html',
                    size: 'sm',
                    backdrop: true,
                    templateUrl: './templates/navbar/popup/register.html',
                    controller: registerCtrl
                })
                .catch(errorCatch.modal)
        }

        // 发布商品
        vm.publish = function () {
            UibModalReset
                .showModal({
                    title: './templates/navbar/popup/title.html',
                    backdrop: true,
                    templateUrl: './templates/navbar/popup/publish.html',
                    controller: publishCtrl
                })
                .then(() => $rootScope.$broadcast('goodsPublishSuccess'))
                .catch(errorCatch.modal)
        }
    }
]