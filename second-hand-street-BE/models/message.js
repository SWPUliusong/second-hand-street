const mongoose = require("mongoose")

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let Message = new Schema({
    content: String,
    gid: ObjectId,
    from: ObjectId,
    to: ObjectId,
    publishTime: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('message', Message)