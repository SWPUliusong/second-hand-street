let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User
let Goods = require(process.cwd() + '/methods').Goods

exports.post  = [
    validator.isLogin(),
    async cxt => {
        let uid = cxt.session.user._id
        let gid = cxt.params.gid

        let flag = await Goods.isExist(gid)

        if (!flag) throw {status: 404, code: 20001}

        User.collect(uid, gid)

        cxt.session.user.collectors.push(gid)
        cxt.status = 200
    }
]

exports.delete = [
    validator.isLogin(),
    async cxt => {
        let uid = cxt.session.user._id
        let gid = cxt.params.gid

        await User.cancelCollect(uid, gid)

        cxt.status = 204
    }
]