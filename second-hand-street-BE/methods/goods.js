const Goods = require('../models').Goods

module.exports = {
    create(data) {
        return Goods.create(data)
    },
    modifyById(id, data) {
        return Goods
            .findByIdAndUpdate(id, data)
            .select('-__v')
            .exec()
    },
    getDetailsById(id) {
        return Goods
            .findByIdAndUpdate(id, { $inc: { pv: 1 } })
            .select('-__v')
            .exec()
            .then(data => data && data.toObject())
    },
    findById(id) {
        return Goods
            .findById(id)
            .select('-__v')
            .exec()
            .then(data => data && data.toObject())
    },
    findOne(data) {
        return Goods
            .findOne(data)
            .select('-__v')
            .exec()
            .then(data => data && data.toObject())
    },
    removeById(id) {
        return Goods.remove({ "_id": id }).exec()
    },
    findByKeyword(keyword) {
        return Goods
            .find({ title: { $regex: new RegExp(keyword, 'i') } })
            .limit(5)
            .select('_id title')
            .exec()
    },
    find(opts) {
        opts.page = parseInt(opts.page) || 1
        opts.sort = opts.sort || 'publishTime'
        opts.reduce = parseInt(opts.reduce) || -1
        opts.limit = parseInt(opts.limit) || 16

        return Goods
            .find(_.pick(opts, ['type', 'subtype']))
            .skip((opts.page - 1) * opts.limit)
            .sort({ [opts.sort]: opts.reduce })
            .limit(opts.limit)
            .select('_id title price pv num images')
            .exec()
            .then(arr => {
                if (!arr) return null
                let content = arr.map(val => {
                    val = val.toObject()
                    val.cover = val.images[0]
                    delete val.images
                    return val
                })
                return content
            })
    },
    count(opts) {
        return Goods.count(opts).exec()
    }
}