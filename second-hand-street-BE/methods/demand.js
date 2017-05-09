const User = require('../models').User
const Demand = require('../models').Demand

module.exports = {
    create(data) {
        return Demand.create(data)
    },
    find(conditions, { page, limit }) {
        return Demand
            .find(conditions)
            .sort({ 'publishTime': -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()
            .then(cols => {
                if (!cols) return []

                cols = cols.map(item => item.toObject())

                let promise
                let promise_arr = []
                cols.forEach(item => {
                    promise = User
                        .findById(item.uid)
                        .select('name tel qq avatar')
                        .exec()
                        .then(user => {
                            item.user = user
                        })

                    promise_arr.push(promise)
                })

                return Promise.all(promise_arr).then(() => cols)
            })
    },
    count(conditions = {}) {
        return Demand.count(conditions).exec()
    },
    remove(opts) {
        return Demand.remove(opts).exec()
    }
}