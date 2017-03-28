const mongoose = require("mongoose")

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let User = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    eamil: { 
        type: String, 
        required: true,
        index: true,
        match: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/ 
    },
    tel: { 
        type: String, 
        match: /^1\d{10}$/ 
    },
    collectors: [ObjectId],
    avatar: String,
    create_at: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("user", User)