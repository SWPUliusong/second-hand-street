const proxy = require("http-proxy-middleware")
const fs = require("fs")
const url = require("url")
const path = require("path")

let config = require("./config")

let errMsg = {
    code: 404,
    message: '没有可用的路由'
}

module.exports = {
    mock() {
        return [
            function(req, res, next) {
                if (req.url.indexOf('/api/') === 0) {
                    let url_obj = url.parse(req.url, true)
                    let pathname = url_obj.pathname.replace('/api/', '/').replace(/\//g, '_')
                    let route = path.join(config.ROUTES, req.method.toUpperCase() + pathname) + '.json'

                    res.setHeader('Content-Type', 'application/json')
                    if (fs.existsSync(route)) {
                        if (url_obj.query.type) {
                            let subtype = url_obj.query.subtype
                            res.setHeader('Type-Subtype', url_obj.query.type + (subtype ? '/' + subtype : ''))
                        }
                        res.writeHead(200)
                        fs.createReadStream(route).pipe(res)
                    } else {
                        res.writeHead(404)
                        res.end(JSON.stringify(errMsg))
                    }
                } else {
                    next()
                }
            }
        ]
    },
    proxy() {
        return [
            proxy('/api', {
                target: 'http://localhost:4000',
                changeOrigin: true,
                logLevel: 'debug'
            })
        ]
    }
}