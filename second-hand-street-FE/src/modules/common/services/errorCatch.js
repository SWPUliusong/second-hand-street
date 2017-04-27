const Code = {
    10001: "邮箱已被注册过",
    10002: "此邮箱尚未注册过",
    10003: "密码错误",
    10004: "尚未登录或登录已过期",
    10005: "没有此类权限",
    10006: "找不到这个用户",
    20001: "找不到这个商品",
    20002: "你不是这个商品的所有者",
    30001: "此商品下不存在该评论",
    40000: "参数格式不正确或不全",
    40003: "url上的消息id缺失",
    40004: "没有与之匹配的路由",
    50000: "发生未知错误"
}

module.exports = [
    'UibModalReset',
    function (UibModalReset) {
        this.modal = function (err) {
            if (err && err.data) {
                let msg = Code[err.data.code]
                UibModalReset.info(msg || '未知的故障,请刷新重试')
            }
            return Promise.reject()
        }

        this.text = function (err = { data: {} }) {
            if (err && err.data) {
                let msg = Code[err.data.code]
                return msg || '未知的故障,请刷新重试'
            }
            return 
        }
    }
]