let validator = require(process.cwd() + '/validator')
let Goods = require(process.cwd() + '/methods').Goods

exports.get = async cxt => {
    let query = cxt.query
    if (query.keyword) {
        cxt.body = await Goods.findByKeyword(query.keyword)
    } else {
        let col = await Promise.all([
            Goods.find(query),
            Goods.count(_.pick(query, ['type', 'subtype']))
        ])

        cxt.body = {
            total: col[1],
            limit: query.limit || 16,
            page: query.page || 1,
            data: col[0] || []
        }
    }
    cxt.status = 200
}

exports.post = [
    validator.isLogin(),
    validator.isExist(['images', 'place', 'details', 'price', 'type', 'subtype']),
    async cxt => {
        let body = cxt.request.body
        body.uid = cxt.session.user._id

        await Goods.create(body)

        cxt.status = 200
    }
]