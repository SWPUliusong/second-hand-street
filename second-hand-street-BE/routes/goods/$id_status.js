let validator = require(process.cwd() + '/validator')
let Goods = require(process.cwd() + '/methods').Goods

exports.put = [
    validator.isLogin(),
    validator.isOwner(),
    async cxt => {
        let id = cxt.params.id

        Goods.workOff(id)

        cxt.status = 200
    }
]