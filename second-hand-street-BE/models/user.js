const mongoose = require("mongoose")

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let User = new Schema({
    name: {
        type: String,
        default: '未命名'
    },
    password: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        index: true
    },
    tel: String,
    qq: String,
    collectors: [ObjectId],
    avatar: {
        type: String,
        default: 'http://ol5140dkq.bkt.clouddn.com/FoHvYP7zIUIxtwJiT7fATMst3kv4'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("user", User)