import loginCtrl from './popup/loginCtrl'
import publishGoods from './popup/publishGoods'

export default [
    '$scope',
    '$http',
    '$document',
    'UibModalReset',
    function ($scope, $http, $document, UibModalReset) {
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
            $http
                .post('/api/intellisense', {
                    keyword: params.keyword
                })
                .success(function (res) {
                    if (res.length) {
                        vm.isShowFeedback = true
                        vm.goods = res
                    }
                })
                .error(function (err) {
                    console.log(err)
                })
        }

        $document.on('click', function () {
            if (vm.isShowFeedback) {
                $scope.$apply(function () {
                    vm.isShowFeedback = false
                });
            }
        })

        vm.loginModal = function () {
            UibModalReset.showModal({
                title: '登录',
                size: 'sm',
                backdrop: false,
                needBottomBtn: true,
                templateUrl: './templates/navbar/popup/login.html',
                controller: loginCtrl
            })
        }

        vm.publishModal = function () {
            UibModalReset
                .showModal({
                    title: '<p class="text-center">发布商品</p>',
                    size: 'md',
                    backdrop: false,
                    keyboard: true,
                    needBottomBtn: true,
                    controller: publishGoods,
                    templateUrl: './templates/navbar/popup/publishModal.html'
                })
                .catch(function (res) {
                    let msg = _.get(res, 'data.message', null)
                    if (msg) {
                        UibModalReset.info(msg)
                    }
                })
        }
    }
]