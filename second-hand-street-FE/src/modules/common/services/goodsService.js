export default [
    '$http',
    function ($http) {
        // 商品查询
        this.find = function (params) {
            return $http.get('/goods', { params })
        }

        // 最新上架
        this.getRecent = function () {
            return $http.get('/recent')
        }

        // 收藏最多
        this.getCollectedMost = function () {
            return $http.get('/collectedMost')
        }

        // 浏览最多
        this.getPvMost = function () {
            return $http.get('/pvMost')
        }

        // 发布商品
        this.publish = function (data) {
            return $http.post('/goods', data)
        }

        // 修改商品
        this.update = function (data) {
            return $http.put(`/goods/${data._id}`, data)
        }

        // 获取商品详情
        this.findById = function (id) {
            return $http.get(`/goods/${id}`)
        }

        // 获取用户发布的商品
        this.findByUserId = function (id, params) {
            return $http.get(`/users/${id}/goods`, { params })
        }

        // 删除商品
        this.delete = function (id) {
            return $http.delete(`/goods/${id}`)
        }

        // 确认商品售出
        this.changeStatus = function (id) {
            return $http.put(`/goods/${id}/status`)
        }

        // 搜索框智能提醒
        this.keyword = function (keyword) {
            return $http.post('/keyword', { keyword })
        }

        // 获取收藏该商品的人数
        this.getNumById = function(goods_id) {
            return $http.get(`/collections/${goods_id}/num`)
        }
    }
]