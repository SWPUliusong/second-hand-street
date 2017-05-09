const mongoose = require("mongoose")

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let Demand = new Schema({
    title: String,
    details: String,
    place: String,
    uid: ObjectId,
    price: Number,
    publishTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Demand', Demand)