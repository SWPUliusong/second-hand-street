let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User
let Goods = require(process.cwd() + '/methods').Goods

exports.get = [
    validator.isLogin(),
    async cxt => {
        let user = cxt.session.user
        let query = cxt.query

        let conditions = {_id: {$in: user.collectors}}

        let data = await Goods.findList(conditions, query)

        cxt.status = 200
        cxt.body = {
            total: user.collectors.length,
            page: query.page,
            limit: query.limit,
            data
        }
    }
]