let validator = require(process.cwd() + '/validator')
let Demand = require(process.cwd() + '/methods').Demand

exports.delete = [
    validator.isLogin(),
    cxt => {
        let _id = cxt.params.id
        let uid = cxt.session.user._id

        Demand.remove({ _id, uid })

        cxt.status = 204
    }
]