global.Promise = require("bluebird")
global._ = require("lodash")

const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-session")
const frouter = require("./frouter")

let app = new Koa()
let config = require("./common").config

if (app.env === 'development') {
    app.use(logger())
}

app.use(async (cxt, next) => {
    try {
        await next()
    } catch (e) {
        if (!e.status) console.error(e)

        cxt.status = e.status || 500
        let code = e.code || 50000
        cxt.body = {code}
    }
})

app.keys = [config.key]
app.use(session({
    key: 'current-user'
}, app))

app.use(bodyparser())

app.use(frouter(app, {
    root: './routes',
    "_": true
}, uri => '/api' + uri))

app.use(cxt => {
    let error = { status: 404, code: 40004 }
    throw error
})

app.listen(config.port, () => console.log('listening on http://localhost:' + config.port))