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