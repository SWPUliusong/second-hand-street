let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User

exports.get = async cxt => {
    let id = cxt.params.id

    let user = await User.findUserById(id)
    if (!user) {
        throw { status: 404, code: 10006 }
    }

    cxt.status = 200
    cxt.body = user
}

exports.put = [
    validator.isAuth('params.id'),
    async cxt => {
        let id = cxt.params.id
        let user = cxt.session.user
        let body = _.pick(cxt.request.body, ['avatar', 'name', 'tel', 'qq'])

        await User.modifyBaseInfo(id, body)

        _.assign(user, body)

        cxt.status = 200
        cxt.body = _.omit(user, 'password')
    }
]