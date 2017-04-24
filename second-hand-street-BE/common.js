const crypto = require("crypto")

exports.md5 = function (str, salt) {
    str = (str + salt).split('').sort().join('')
    return crypto.createHash('md5').update(str).digest('hex')
}