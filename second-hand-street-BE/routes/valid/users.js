exports.get = cxt => {
    let user = Object.assign({}, cxt.session.user)

    if (user._id) {
        delete user.password

        cxt.status = 200
        cxt.body = user
    } else {
        throw {status: 401, code: 10004}
    }
}