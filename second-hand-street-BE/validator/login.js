exports.checkNotLogin = async (cxt, next) => {
    if (cxt.session._user) await next()
    else {
        let err = {status: 401, code: 10004}
        throw err
    }
}
