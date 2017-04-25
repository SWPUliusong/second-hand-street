let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User

exports.get = [
    validator.isLogin(),
    async cxt => {
        let gid = cxt.params.gid
        let uid = cxt.session.user._id

        let flag = await User.isCollect(uid, gid)

        cxt.status = 200
        cxt.body = {flag}
    }
]