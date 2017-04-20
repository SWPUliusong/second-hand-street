const mongoose = require("mongoose")

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let Goods = new Schema({
    images: [String],
    place: String,
    details: String,
    uid: ObjectId,
    status: {
        type: Number,
        default: 0
    },
    pv: {
        type: Number,
        default: 0
    },
    title: String,
    publishTime: {
        type: Date,
        default: Date.now
    },
    price: Number,
    num: {
        type: Number,
        default: 0
    },
    type: String,
    subtype: String
})

module.exports = mongoose.model('goods', Goods)