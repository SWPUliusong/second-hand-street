const mongoose = require("mongoose")

let dbUrl = require("../common").config.dbUrl
mongoose.connect(dbUrl)

mongoose.Promise = global.Promise

module.exports = {
    User: require("./user"),
    Goods: require("./goods"),
    Message: require("./message")
}