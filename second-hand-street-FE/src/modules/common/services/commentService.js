export default [
    '$http',
    function ($http) {
        // 获取用户消息
        this.findByUser = function (params) {
            return $http.get('/messages', { params })
        }

        // 发表评论
        this.publish = function (data) {
            return $http.post('/messages', data)
        }

        // 获取商品评论
        this.findByGoodsId = function (id, params) {
            return $http.get(`/goods/${id}/messages`, { params })
        }

        // 删除评论
        this.delete = function (params) {
            return $http.delete(`/goods/${params.gid}/messages/${params.cid}`)
        }

    }
]