const del = require("del")
const path = require("path")

let config = require("./config")

module.exports = {
    clean() {
        return del([config.FOLDRE, config.ZIP_NAME])
    },
    clean_bundle() {
        return del([config.FOLDRE + path.sep + 'bundle.*.js'])
    }
}