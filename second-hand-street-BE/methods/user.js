const User = require('../models').User
const common = require("../common")

module.exports = {
    create(data) {
        data.password = common.md5(data.password, data.email)
        return User.create(data)
    },
    emailExist(email) {
        return User
            .findOne({ email: email })
            .exec()
            .then(data => {
                if (data && data._id) {
                    return true
                }
                return false
            })
            .catch(() => false)
    },
    findByEmail(email) {
        return User
            .findOne({ email: email })
            .exec()
            .then(data => data && data.toObject())
    },
    getOwnerById(id) {
        return User
            .findById(id)
            .select('_id name qq tel avatar')
            .exec()
            .then(data => data && data.toObject())
    }
}

