export default [
    '$http',
    function ($http) {
        // 按类型获取所有商品
        this.getByTypeOrSubtype = function (params) {
            return $http({
                method: 'GET_HAL',
                url: '/goods',
                params
            })
        }

        // 获取最新发布的商品
        this.getRecent = function () {
            return $http({
                method: 'GET_HAL',
                url: '/goods/recent'
            })
        }

        // 获取收藏最多的商品
        this.getCollectedMost = function () {
            return $http({
                method: 'GET_HAL',
                url: '/goods/collectedMost'
            })
        }

        // 获取浏览数最多的商品
        this.getPvMost = function () {
            return $http({
                method: 'GET_HAL',
                url: '/goods/pvMost'
            })
        }

        // 发布商品
        this.publish = function(data) {
            return $http({
                method: 'POST_HAL',
                url: '/goods',
                data
            })
        }
    }
]