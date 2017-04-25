const crypto = require("crypto")

exports.md5 = function (str, salt) {
    str = (str + salt).split('').sort().join('')
    return crypto.createHash('md5').update(str).digest('hex')
}

exports.config = {
    port: 4000,
    dbUrl: 'mongodb://localhost:27017/second-hand-street',
    key: 'second-hand-street'
}