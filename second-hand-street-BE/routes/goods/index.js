let validator = require(process.cwd() + '/validator')
let Goods = require(process.cwd() + '/methods').Goods

exports.get = async cxt => {
    let query = cxt.query
    if (query.keyword) {
        cxt.body = await Goods.findByKeyword(query.keyword)
    } else {
        let col = await Promise.all([
            Goods.find(_.assign({}, query, {status: 0}), ['type', 'subtype', 'status']),
            Goods.count(_.pick(query, ['type', 'subtype']))
        ])

        cxt.body = {
            total: col[1],
            limit: query.limit,
            page: query.page,
            data: col[0]
        }
    }
    cxt.status = 200
}

exports.post = [
    validator.isLogin(),
    validator.isExist(['images', 'title', 'place', 'details', 'price', 'type']),
    async cxt => {
        let body = cxt.request.body
        body.uid = cxt.session.user._id

        await Goods.create(body)

        cxt.status = 200
    }
]