export default [
    '$http',
    '$rootScope',
    function ($http, $rootScope) {
        // 确认邮箱是否注册
        this.email = function(data) {
            return $http({
                url: '/valid/email',
                method: 'POST_HAL',
                data
            })
        }

        // 确认商品是否收藏
        this.collections = function(data) {
            return $http({
                url: '/valid/collections',
                method: 'POST_HAL',
                data
            })
        }

        // 验证用户是否未过期
        this.user = function() {
            return $http({
                url: '/valid/users',
                method: 'GET_HAL'
            }).then(res => $rootScope.user = res.data)
        }
    }
]