export default [
    '$http',
    '$rootScope',
    function ($http, $rootScope) {
        // 确认邮箱是否注册
        this.email = function (email) {
            return $http.post('/valid/email', { email })
        }

        // 确认商品是否收藏
        this.collections = function (goods_id) {
            return $http.get(`/valid/${goods_id}/collections`)
        }

        // 验证用户是否未过期
        this.user = function () {
            return $http
                .get('/valid/users')
                .then(res => $rootScope.user = res.data)
        }

        // 同步验证用户是否未过期
        this.userSync = function () {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', '/api/valid/users', false)
            xhr.setRequestHeader("ACCEPT", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        $rootScope.user = JSON.parse(xhr.responseText)
                    }
                }
            }
            xhr.send()
        }
    }
]