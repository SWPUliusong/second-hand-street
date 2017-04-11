var reg = {
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    tel: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    qq: /^[1-9][0-9]{4,}$/,
    chinese: /^[\u4e00-\u9fa5]+$/,
    password: /^\S{6,}$/
}

function handle(val, regExp) {
    if (!val) return false
    if (regExp.test(val)) {
        return true
    } else {
        return false
    }
}

let result = {}

_.forEach(reg, (val, key) => {
    result[key] = function(str) {
        return handle(str, val)
    }
})

module.exports = result