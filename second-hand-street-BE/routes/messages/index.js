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