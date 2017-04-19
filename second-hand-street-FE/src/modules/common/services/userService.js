export default [
    'store',
    '$http',
    '$rootScope',
    function (store, $http, $rootScope) {
        // 注册
        this.register = function (data) {
            return $http
                .post('/users', data)
                .then(res => $rootScope.user = res.data)
        }

        // 登录
        this.signin = function (data) {
            return $http
                .post('/signin', data)
                .then(res => $rootScope.user = res.data)
        }

        // 注销
        this.signout = function () {
            return $http
                .delete('/users')
                .then(res => delete $rootScope.user)
        }

        // 获取用户数据
        this.findById = function (id) {
            return $http.get(`/users/${id}`)
        }

        // 修改用户信息
        this.update = function (data) {
            return $http
                .put('/users', data)
                .then(res => $rootScope.user = res.data)
        }

        // 修改密码
        this.updatePassword = function (data) {
            return $http
                .put('/password', data)
                .then(res => {
                    let loginInfo = store.get('loginInfo')
                    if (!!loginInfo) {
                        loginInfo.password = data.new_password
                        store.set('loginInfo', loginInfo)
                    }
                    return res
                })
        }

        // 收藏商品
        this.collect = function (id) {
            return $http.post(`/collections/${id}`)
        }

        // 取消收藏
        this.cancelCollect = function (id) {
            return $http.delete(`/collections/${id}`)
        }

        // 获取收藏列表
        this.findCollections = function (params) {
            return $http.get('/collections', { params })
        }

    }
]