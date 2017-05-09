export default [
    '$http',
    function ($http) {
        // 获取需求
        this.find = params => {
            return $http.get('/demand', { params })
        }

        // 获取当前用户的需求列表
        this.findById = (id, params) => {
            return $http.get(`/users/${id}/demand`, { params })
        }

        // 删除自己发布的需求
        this.remove = id => {
            return $http.delete(`/demand/${id}`)
        }

        // 发布需求
        this.publish = data => {
            return $http.post('/demand', data)
        }
    }
]