let Goods = require(process.cwd() + '/methods').Goods

exports.get = async cxt => {
    let conditions = {uid: cxt.params.id}
    let query = cxt.query

    if (query.status) {
        conditions.status = parseInt(query.status)
    }

    let col = await Promise.all([
        Goods.findList(conditions, query),
        Goods.count(conditions)
    ])

    cxt.status = 200
    cxt.body = {
        total: col[1],
        page: query.page,
        limit: query.limit,
        data: col[0]
    }
}