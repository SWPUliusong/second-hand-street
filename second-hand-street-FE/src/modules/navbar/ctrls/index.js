import loginCtrl from './popup/loginCtrl'
import registerCtrl from './popup/registerCtrl'
import publishGoods from './popup/publishGoods'

export default [
    '$scope',
    '$http',
    '$document',
    'userService',
    'goodsService',
    'UibModalReset',
    function ($scope, $http, $document, userService, goodsService, UibModalReset) {
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
                .keyword(params.keyword)
                .success(function (res) {
                    if (res.length) {
                        vm.isShowFeedback = true
                        vm.goods = res
                    }
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
                .catch(err => {
                    // 
                    // Error catch
                    // 
                })
        }

        // 发布商品
        vm.publish = function () {
            UibModalReset
                .showModal({
                    title: '<p class="text-center">发布商品</p>',
                    size: 'sm',
                    backdrop: true,
                    keyboard: true,
                    controller: publishGoods,
                    templateUrl: './templates/navbar/popup/publishModal.html'
                })
                .catch(function (res) {
                    // 
                    // Error catch
                    // 
                })
        }

        // 退出
        vm.logout = function () {
            userService
                .signout()
                .catch(err => {
                    // 
                    // Error catch
                    // 
                })
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
                .catch(err => {
                    // 
                    // Error catch
                    // 
                })
        }
    }
]