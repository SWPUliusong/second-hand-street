let validator = require(process.cwd() + '/validator')
let Message = require(process.cwd() + '/methods').Message

exports.get = [
    validator.isLogin(),
    async cxt => {
        let query = cxt.query
        let conditions = {
            to: cxt.session.user._id
        }

        if (query.isRead !== undefined) {
            conditions.isRead = query.isRead
        }

        let cols = await Promise.all([
            Message.getMsg(conditions, query),
            Message.count(conditions)
        ])

        cxt.status = 200
        cxt.body = {
            total: cols[1],
            page: query.page,
            limit: query.limit,
            data: cols[0]
        }
    }
]

exports.delete = [
    validator.isLogin(),
    (cxt, next) => {
        let id = cxt.params.id
        if (id) return next()
        throw {status: 400, code: 40003}
    },
    cxt => {
        let to = cxt.session.user._id
        let _id = cxt.params.id

        Message.remove({_id, to})

        cxt.status = 204
    }
]