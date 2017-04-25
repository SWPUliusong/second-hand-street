let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User

exports.put = [
    validator.isAuth('params.id'),
    validator.password(),
    async cxt => {
        let user = cxt.session.user
        let body = _.pick(cxt.request.body, ['old_password', 'new_password'])

        let password = await User.modifyPassword(user._id, body.new_password, user.email)

        _.assign(user, {password})

        cxt.status = 200
        cxt.body = _.omit(user, 'password')
    }
]