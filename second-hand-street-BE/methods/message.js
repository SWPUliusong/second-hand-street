const Message = require('../models').Message
const User = require('./user')
const common = require("../common")

module.exports = {
    create(data) {
        return Message
            .create(data)
            .then(data => _.omit(data.toObject(), '__v'))
    },
    findByGoodsId(gid, opts) {

        opts.page = parseInt(opts.page) || 1
        opts.limit = parseInt(opts.limit) || 10

        return Message
            .find({ gid })
            .skip((opts.page - 1) * opts.limit)
            .limit(opts.limit)
            .select("-__v")
            .exec()
            .then(arr => {
                if (!arr) return []
                let promiss_arr = []
                arr = arr.map(val => val.toObject())
                arr.forEach(val => {
                    promiss_arr.push(User.getUser(val.from).then(data => val.from = data))
                    if (val.to) {
                        promiss_arr.push(User.getUser(val.to).then(data => val.to = data))
                    }
                })
                return Promise.all(promiss_arr).then(() => arr)
            })
    },
    getMsg(conditions, opts) {
        let self = this

        opts.page = parseInt(opts.page) || 1
        opts.limit = parseInt(opts.limit) || 10

        return Message
            .find(conditions)
            .skip((opts.page - 1) * opts.limit)
            .limit(opts.limit)
            .select("-__v -to")
            .exec()
            .then(arr => {
                if (!arr) return []

                let promiss_arr = [], id_arr = []

                arr = arr.map(val => val.toObject())
                arr.forEach(val => {
                    id_arr.push(val._id)
                    promiss_arr.push(User.getUser(val.from).then(data => val.from = data))
                })

                self.changeRead(id_arr)
                return Promise.all(promiss_arr).then(() => arr)
            })
    },
    isExist(conditions) {
        return Message
            .findOne(conditions)
            .exec()
            .then(data => {
                if (data) return true
                return false
            })
    },
    count(conditions) {
        return Message.count(conditions).exec()
    },
    remove(_id) {
        return Message.remove({ _id }).exec()
    },
    changeRead(id_arr) {
        return Message
            .update({
                _id: { $in: id_arr }
            }, {
                $set: { isRead: true }
            }, {
                multi: true
            })
            .exec()
    }
}