exports.isLogin = () => (cxt, next) => {
    if (cxt.session.user) return next()
    else {
        throw { status: 401, code: 10004 }
    }
}

exports.isAdmin = (key) => (cxt, next) => {
    let user = cxt.session.user
    let uid = _.get(cxt, key, null)

    if (!user) {
        throw { status: 401, code: 10004 }
    }

    if (uid !== user._id) {
        throw { status: 403, code: 10005 }
    }

    return next()
}

exports.isExist = arr => (cxt, next) => {
    let body = cxt.request.body
    for (let i = 0; i < arr.length; i++) {
        if (!body[arr[i]]) {
            throw { status: 400, code: 40000 }
        }
    }

    return next()
}