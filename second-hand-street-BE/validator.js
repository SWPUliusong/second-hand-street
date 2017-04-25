const common = require("./common")
const Goods = require("./methods").Goods

// 是否已登录
exports.isLogin = () => (cxt, next) => {
    if (cxt.session.user) return next()
    else {
        throw { status: 401, code: 10004 }
    }
}

// 是否拥有操作当前登录用户的权限
exports.isAuth = (key = 'request.body.uid') => (cxt, next) => {
    let user = cxt.session.user
    let uid = _.get(cxt, key, null)

    if (!user) {
        throw { status: 401, code: 10004 }
    }

    if (uid !== user._id) {
        throw { status: 403, code: 10005 }
    }

    return next()
}

// 当前用户是否是商品的所有者
exports.isOwner = (gid_key = 'params.id', uid_key = 'session.user._id') => async (cxt, next) => {
    let gid = _.get(cxt, gid_key)
    let uid = _.get(cxt, uid_key)

    let goods = await Goods.findOne({_id: gid, uid})

    if (goods) return next()
    throw {status: 403, code: 10005}
}

// 密码是否正确
exports.password = (key = 'request.body.old_password') => (cxt, next) => {
    let user = cxt.session.user
    let password = common.md5(_.get(cxt, key, ''), user.email)

    if (user.password !== password) {
        throw {status: 403, code: 10003}
    }

    return next()
}

// body中是否含有必需的参数
exports.isExist = arr => (cxt, next) => {
    let body = cxt.request.body
    for (let i = 0; i < arr.length; i++) {
        if (!body[arr[i]]) {
            throw { status: 400, code: 40000 }
        }
    }

    return next()
}