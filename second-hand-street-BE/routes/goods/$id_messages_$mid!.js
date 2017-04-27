let validator = require(process.cwd() + '/validator')
let User = require(process.cwd() + '/methods').User
let Goods = require(process.cwd() + '/methods').Goods
let Message = require(process.cwd() + '/methods').Message

exports.post = [
    validator.isLogin(),
    validator.isExist(['content']),
    cxt => {
        let user = cxt.session.user
        let body = _.pick(cxt.request.body, ['content', 'to'])

        _.assign(body, {
            gid: cxt.params.id,
            from: user._id
        })

        Message.create(body)

        cxt.status = 200
    }
]

exports.get = async cxt => {
    let gid = cxt.params.id
    let query = cxt.query

    let cols = await Promise.all([
        Message.findByGoodsId(gid, query),
        Message.count({ gid })
    ])

    cxt.status = 200
    cxt.body = {
        total: cols[1],
        page: query.page,
        limit: query.limit,
        data: cols[0]
    }
}

exports.delete = [
    validator.isLogin(),
    (cxt, next) => {
        if (cxt.params.mid) return next()
        throw { status: 400, code: 40003 }
    },
    async cxt => {
        let user = cxt.session.user
        let gid = cxt.params.id
        let mid = cxt.params.mid

        let cols = await Promise.all([
            Goods.isExist({ _id: gid, uid: user._id }),
            Message.isExist({ _id: mid, gid })
        ])

        if (!cols[0]) {
            throw { status: 403, code: 20002 }
        } else if (!cols[1]) {
            throw { status: 403, code: 30001 }
        } else {
            Message.remove({ _id: mid })
            cxt.status = 204
        }

    }
]