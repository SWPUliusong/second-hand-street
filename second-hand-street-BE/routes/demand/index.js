let validator = require(process.cwd() + '/validator')
let Demand = require(process.cwd() + '/methods').Demand

exports.get = async cxt => {
    let { page = 1, limit = 10 } = cxt.query

    let col = await Promise.all([
        Demand.count(),
        Demand.find({}, { page, limit })
    ])

    cxt.status = 200
    cxt.body = {
        total: col[0],
        limit: limit,
        page: page,
        data: col[1]
    }
}

let arg_arr = ['title', 'place', 'details', 'price']

exports.post = [
    validator.isLogin(),
    validator.isExist(arg_arr),
    async cxt => {
        let body = _.pick(cxt.request.body, arg_arr)
        body.uid = cxt.session.user._id

        await Demand.create(body)

        cxt.status = 200
    }
]