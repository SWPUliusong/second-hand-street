let validator = require(process.cwd() + '/validator')
let common = require(process.cwd() + '/common')
let User = require(process.cwd() + '/methods').User

exports.post = [
    validator.isExist(['email', 'password']),
    async cxt => {
        let body = cxt.request.body

        let user = await User.findByEmail(body.email)

        if (user.password === common.md5(body.password, body.email)) {
            cxt.session.user = Object.assign({}, user)

            delete user.password
            cxt.status = 200
            cxt.body = user
        } else {
            throw { status: 401, code: 10003 }
        }
    }
]