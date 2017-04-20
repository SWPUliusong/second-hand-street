let validator = require(process.cwd() + '/validator/login')

exports.get = [
    validator.checkNotLogin,
    cxt => {
        cxt.body = 'hello'
    }
] 