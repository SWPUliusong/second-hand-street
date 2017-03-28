const express = require("express")
const http = require("http")
const logger = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const frouter = require("frouter")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

let app = express()
let config = require("./config")

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        url: config.dbUrl
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    secret: config.secret,
    resave: false,
    saveUninitialized: true
}))
app.use(frouter(app, {
    root: './routes',
    "_": true
}))
app.use(function(req, res, next) {
    let err = new Error('not found')
    err.status = 404
    next(err)
})
app.use(function(err, req, res, next) {
    let error = err || {}
    res.status(error.status || 500).json(error)
})

http.createServer(app)
    .on('error', err => console.log(err))
    .listen(config.port, () => console.log('listening on ' + config.port))