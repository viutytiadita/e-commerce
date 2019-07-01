const Cart = require('../models/cart')

function authorization(req, res, next) {
    if (req.datauser.role == 'admin') {
        next()
    } else if (req.datauser.role == 'customer') {
        Cart.findById(req.params.cartid)
            .then((cart) => {
                if (cart.user_id == req.decoded.id) {
                    next()
                }
            })
            .catch(() => {
                res.staus(401).json({
                    message: " you are not authorized"
                })
            })
    } else {
        res.status(401).json({
            message: "you are not authorized"
        })
    }




}

module.exports = { authorization }