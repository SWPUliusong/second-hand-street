exports.checkNotLogin = function(req, res, next) {
	if (req.session._user) next()
	else {
        let err = new Error('当前未登录')
        err.status = 401
        next(err)
    }
}