let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User
let Goods = require(process.cwd() + '/methods').Goods

exports.post  = [
    validator.isLogin(),
    async cxt => {
        let uid = cxt.session.user._id
        let gid = cxt.params.gid
        let collectors = cxt.session.user.collectors

        let flag = await Goods.isExist(gid)

        if (!flag) throw {status: 404, code: 20001}

        User.collect(uid, gid)

        if (collectors.indexOf(gid) === -1) {
            Goods.incNum(gid)
            collectors.push(gid)
        }

        cxt.status = 200
    }
]

exports.delete = [
    validator.isLogin(),
    cxt => {
        let uid = cxt.session.user._id
        let gid = cxt.params.gid
        let collectors = cxt.session.user.collectors

        User.cancelCollect(uid, gid)

        if (collectors.indexOf(gid) > -1) {
            Goods.reduceNum(gid)
            _.pull(collectors, gid)
        }

        cxt.status = 204
    }
]