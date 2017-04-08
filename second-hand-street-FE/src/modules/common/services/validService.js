export default [
    '$http',
    function ($http) {
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
    }
]