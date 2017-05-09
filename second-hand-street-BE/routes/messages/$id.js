let validator = require(process.cwd() + '/validator')
let Message = require(process.cwd() + '/methods').Message

exports.delete = [
    validator.isLogin(),
    cxt => {
        let to = cxt.session.user._id
        let _id = cxt.params.id

        Message.remove({_id, to})

        cxt.status = 204
    }
]