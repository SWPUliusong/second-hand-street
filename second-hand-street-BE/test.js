const ObjectId = require("mongoose").Schema.Types.ObjectId

let obj;

try {
    obj = new ObjectId('58fdb50918e4c583a2bd')
} catch(e) {
    console.error(e)
}

console.log(obj)