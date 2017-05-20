let Goods = require(process.cwd() + '/methods').Goods

exports.get = async cxt => {
    let query = {
        sort: 'publishTime',
        limit: 8,
        status: 0
    }

    cxt.status = 200
    cxt.body = await Goods.find(query, ['status'])
}