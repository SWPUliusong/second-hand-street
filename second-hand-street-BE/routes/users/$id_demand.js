let Demand = require(process.cwd() + '/methods').Demand

exports.get = async cxt => {
    let uid = cxt.params.id
    let { page = 1, limit = 10 } = cxt.query

    let col = await Promise.all([
        Demand.count({ uid }),
        Demand.find({ uid }, { page, limit })
    ])

    cxt.status = 200
    cxt.body = {
        total: col[0],
        limit: limit,
        page: page,
        data: col[1]
    }
}
