export default [
    '$http',
    function ($http) {
        // 商品查询
        this.find = function (params) {
            return $http({
                method: 'GET_HAL',
                url: '/goods',
                params
            })
        }

        // 最新上架
        this.getRecent = function () {
            return $http({
                method: 'GET_HAL',
                url: '/recent'
            })
        }

        // 收藏最多
        this.getCollectedMost = function () {
            return $http({
                method: 'GET_HAL',
                url: '/collectedMost'
            })
        }

        // 浏览最多
        this.getPvMost = function () {
            return $http({
                method: 'GET_HAL',
                url: '/pvMost'
            })
        }

        // 发布商品
        this.publish = function (data) {
            return $http({
                method: 'POST_HAL',
                url: '/goods',
                data
            })
        }

        // 修改商品
        this.update = function (id, data) {
            return $http({
                method: 'PUT_HAL',
                url: `/goods/${id}`,
                data
            })
        }

        // 获取商品详情
        this.findById = function (id) {
            return $http({
                method: 'GET_HAL',
                url: `/goods/${id}`
            })
        }

        // 获取用户发布的商品
        this.findByUserId = function (id, params) {
            return $http({
                method: 'GET_HAL',
                url: `/users/${id}/goods`,
                params
            })
        }

        // 删除商品
        this.delete = function (id) {
            return $http({
                method: 'DELETE_HAL',
                url: `/goods/${id}`
            })
        }

        // 确认商品售出
        this.changeStatus = function (id) {
            return $http({
                method: 'PUT_HAL',
                url: `/goods/${id}/status`
            })
        }

        // 搜索框智能提醒
        this.keyword = function (keyword) {
            return $http({
                method: 'POST_HAL',
                url: '/keyword',
                data: { keyword }
            })
        }
    }
]