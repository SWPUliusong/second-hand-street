let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User

exports.post = [
    validator.isExist(['email', 'password']),
    async cxt => {
        let body = _.pick(cxt.request.body, ['name', 'email', 'password'])

        if (await User.emailExist(body.email)) {
            throw {status: 403, code: 10001}  
        }

        let user = await User.create(body)
        cxt.session.user = Object.assign({}, user)
        delete user.password

        cxt.body = user
        cxt.status = 200
    }
]

exports.delete = cxt => {
    let user = cxt.session.user
    if (user) {
        cxt.session.user = null
        cxt.status = 200
    } else {
        throw {status: 401, code: 10004}
    }
}

exports.put = [
    validator.isLogin(),
    async cxt => {
        let user = cxt.session.user
        let body = _.pick(cxt.request.body, ['avatar', 'name', 'tel', 'qq'])

        await User.modifyBaseInfo(user._id, body)

        _.assign(user, body)

        cxt.status = 200
        cxt.body = _.omit(user, 'password')
    }
]