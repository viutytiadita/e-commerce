const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
    static fetch(req, res, next) {
        Cart.find({user_id : req.decoded.id}).populate('product_id').exec(function (err, data) {
            if (err) {
                next
            } else {
                console.log(data);
                res.status(200).json(data)
            }
        })
    }

    static fetchOne(req,res,next){
        Cart.findOne({product_id: req.params.productid}, function(err, data){
            if(err){
                next
            }else{
                res.status(200).json(data)
            }
        })
    }

    static create(req, res, next) {
        Cart.create({
            user_id: req.decoded.id,
            product_id: req.body.product_id
        })
            .then(function (newdata) {
                res.status(201).json(newdata)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Cart.deleteOne({ _id: req.params.cartid }, function (err, data) {
            if (err) {
                next
            } else {
                res.status(200).json(data)
            }
        })
    }

    static updateCount(req,res,next){
        console.log(req.body);
        
        Cart.updateOne({_id: req.params.cartid},{
            count : req.body.count+1
        }, function(err,data){
            if (err) {
                next
            } else {
                res.status(200).json(data)
            }
        })
    }
}

module.exports = CartController