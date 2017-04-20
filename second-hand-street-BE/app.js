const koa = require("koa")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-session")
const frouter = require("./frouter")

let app = new koa()
let config = require("./config")

if (app.env === 'development') {
    app.use(logger())
}

app.use(async (cxt, next) => {
    try {
        await next()
    } catch (e) {
        cxt.status = e.status
        cxt.body = e
    }
})

app.use(session({
    key: config.key
}, app))

app.use(bodyparser())

app.use(frouter(app, {
    root: './routes',
    "_": true
}, uri => '/api' + uri))

app.use(cxt => {
    let error = {status: 404}
    throw error
})

app.listen(config.port, () => console.log('listening on http://localhost:' + config.port))