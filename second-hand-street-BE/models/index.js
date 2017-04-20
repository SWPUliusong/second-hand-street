const mongoose = require("mongoose")

let dbUrl = require("../config").dbUrl
mongoose.connect(dbUrl)

module.exports = {
    User: require("./user"),
    Goods: require("./goods"),
    Message: require("./message")
}