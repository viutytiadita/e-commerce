const { verify } = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        const decode = verify(req.headers.token)
        req.decoded = decode
    }
    catch (err) {
        next(err)
    }

    User.findOne({
        email: req.decoded.email
    })
        .then(user => {
            req.datauser = user
            if (user) {
                next()
            } else {
                throw ({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
        .catch(next)


}