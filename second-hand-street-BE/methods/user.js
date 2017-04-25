const User = require('../models').User
const common = require("../common")

module.exports = {
    create(data) {
        data.password = common.md5(data.password, data.email)
        return User.create(data).then(data => _.omit(data.toObject(), '__v'))
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
            .select('-__v')
            .exec()
            .then(data => data && data.toObject())
    },
    findUserById(id) {
        return User
            .findById(id)
            .select('-password -__v')
            .exec()
            .then(data => data && data.toObject())
    },
    getUser(id) {
        return User
            .findById(id)
            .select('_id name')
            .exec()
            .then(data => data && data.toObject())
    },
    getOwnerById(id) {
        return User
            .findById(id)
            .select('_id name qq tel avatar')
            .exec()
            .then(data => data && data.toObject())
    },
    modifyBaseInfo(id, data) {
        return User
            .update({ _id: id }, {$set: data}, { multi: false })
            .exec()
    },
    modifyPassword(id, password, salt) {
        password = common.md5(password, salt)

        return User
            .update({ _id: id }, { $set: {password} }, { multi: false })
            .exec()
            .then(() => password)
    },
    collect(uid, gid) {
        return User
            .update({ _id: uid }, { $addToSet: { collectors: gid } }, { multi: false })
            .exec()
    },
    isCollect(uid, gid) {
        return User
            .findOne({ _id: uid, collectors: { $all: [gid] } })
            .exec()
            .then(data => {
                if (data) return true
                return false
            })
    },
    cancelCollect(uid, gid) {
        return User
            .update({ _id: uid }, { $pull: { collectors: gid } }, { multi: false })
            .exec()
    },
    getCollectors(id) {
        return User
            .findById(id)
            .select('collectors')
            .exec()
            .then(data => {
                if(!data) return null
                data = data.toObject()
                return data.collectors
            })
    }
}

