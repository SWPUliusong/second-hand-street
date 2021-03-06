let validator = require(process.cwd() + '/validator')
let Goods = require(process.cwd() + '/methods').Goods
let User = require(process.cwd() + '/methods').User

exports.put = [
    validator.isAuth(),
    validator.isExist(['images', 'title', 'place', 'details', 'price', 'type']),
    async cxt => {
        let body = cxt.request.body
        let id = cxt.params.id

        await Goods.modifyById(id, body)

        cxt.status = 200
    }
]

exports.delete = [
    validator.isLogin(),
    async cxt => {
        let user = cxt.session.user
        let id = cxt.params.id

        let goods = await Goods.findOne({_id: id, uid: user._id})

        if (!goods || !goods._id) {
            throw { status: 403, code: 10005 }
        }

        Goods.removeById(id)
        User.cancelCollect({collectors: {$all: [id]}}, id)

        cxt.status = 200
    }
]

exports.get = async cxt => {
    let id = cxt.params.id

    let goods = await Goods.getDetailsById(id)
    if (!goods) {
        throw {status: 404, code: 20001}
    }

    let owner = await User.getOwnerById(goods.uid)

    // 若尚未登录，则抹掉联系方式信息
    if (!cxt.session.user) {
        owner.tel = owner.tel && '登陆后显示'
        owner.qq = owner.qq && '登陆后显示'
    }
    
    goods.owner = owner

    cxt.status = 200
    cxt.body = goods
}