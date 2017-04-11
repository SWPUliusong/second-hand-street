export default [
    '$http',
    '$rootScope',
    function ($http, $rootScope) {
        // 注册
        this.register = function (data) {
            return $http({
                url: '/users',
                method: 'POST_HAL',
                data
            }).then(res => $rootScope.user = res.data)
        }

        // 登录
        this.signin = function (data) {
            return $http({
                url: '/signin',
                method: 'POST_HAL',
                data
            }).then(res => $rootScope.user = res.data)
        }

        // 注销
        this.signout = function () {
            return $http({
                url: '/users',
                method: 'DELETE_HAL'
            }).then(res => delete $rootScope.user)
        }

        // 获取用户数据
        this.findById = function (id) {
            return $http({
                url: `/users/${id}`,
                method: 'GET_HAL'
            })
        }

        // 修改用户信息
        this.update = function (data) {
            return $http({
                url: `/users/${data.id}`,
                method: 'PUT_HAL',
                data
            }).then(res => $rootScope.user = res.data)
        }

        // 修改密码
        this.updatePassword = function (data) {
            return $http({
                url: `/users/${data.id}/password`,
                method: 'PUT_HAL',
                data
            })
        }

        // 收藏商品
        this.collect = function (data) {
            return $http({
                url: '/collections',
                method: 'POST_HAL',
                data
            })
        }

        // 取消收藏
        this.cancelCollect = function (id) {
            return $http({
                url: `/collections/${id}`,
                method: 'DELETE_HAL'
            })
        }

        // 获取收藏列表
        this.findCollections = function () {
            return $http({
                url: '/collections',
                method: 'GET_HAL'
            })
        }

    }
]