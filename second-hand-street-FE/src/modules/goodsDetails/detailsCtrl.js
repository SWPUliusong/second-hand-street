module.exports = [
    'util',
    '$scope',
    '$timeout',
    'errorCatch',
    'userService',
    'validService',
    'goodsDetails',
    'UibModalReset',
    'commentService',
    function (util, $scope, $timeout, errorCatch, userService, validService, goodsDetails, UibModalReset, commentService) {
        util.scrollTo(0)
        
        let vm = $scope.vm = {}
        let params = $scope.params = {
            page: 1
        }
        let msgParams = $scope.msgParams = {}

        $scope.page = 1;

        vm.goods = goodsDetails

        // 激活的图片
        vm.activeImg = {
            index: 0,
            value: vm.goods.images[0]
        }

        // 验证是否已收藏
        validService
            .collections(goodsDetails._id)
            .then(res => vm.isCollect = res.data.flag)

        // 收藏或取消收藏
        vm.collect = function () {
            if (!$scope.user) {
                UibModalReset.info('请先登录')
                return
            }

            let id = goodsDetails._id
            if (vm.isCollect) {
                userService
                    .cancelCollect(id)
                    .then(res => {
                        vm.goods.num--
                        vm.isCollect = false
                    })
            } else {
                userService
                    .collect(id)
                    .then(res => {
                        vm.goods.num++
                        vm.isCollect = true
                    })
            }
        }

        $scope.$watch('params.page', loadData)

        // 防止多次加载
        let timer;
        function loadData() {
            if (timer) $timeout.cancel(timer)
            timer = $timeout(() => {
                commentService
                    .findByGoodsId(goodsDetails._id, params)
                    .then(res => {
                        vm.message = res.data.data
                        $scope.pageValue = _.pick(_.get(res, 'data', {}), ['total', 'page', 'limit'])

                        if (vm.message.length < 1 && params.page > 1) {
                            params.page--
                        }
                    })
            })
        }

        // 输入框切换
        vm.changeInput = function (tag) {
            msgParams.content = null;
            if (vm.activeInput === tag) {
                vm.activeInput = null
            } else {
                vm.activeInput = tag
            }
        }

        // 回复
        vm.reply = function (to) {
            if (!msgParams.content) return
            commentService
                .publish(goodsDetails._id, _.assign({}, msgParams, { to }))
                .then(res => {
                    vm.changeInput();
                    params.page = 1;
                    loadData()
                })
                .catch(errorCatch.modal)
        }

        // 删除评论
        vm.delete = cid => {
            UibModalReset
                .choose('是否删除此条评论')
                .then(() => {
                    return commentService.delete({ gid: goodsDetails._id, cid })
                })
                .then(loadData)
                .catch(errorCatch.modal)
        }
    }
]