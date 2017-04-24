let Goods = require(process.cwd() + '/methods').Goods

exports.get = async cxt => {
    let query = {
        sort: 'pv',
        limit: 8
    }

    cxt.status = 200
    cxt.body = await Goods.find(query)
}