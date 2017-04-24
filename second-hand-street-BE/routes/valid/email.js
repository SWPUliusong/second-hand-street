let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User

exports.post = [
    validator.isExist(['email']),
    async cxt => {
        let body = cxt.request.body

        let flag = await User.emailExist(body.email)

        cxt.status = 200
        cxt.body = {flag}
    }
]