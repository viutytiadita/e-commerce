const Product = require('../models/product')

class ProductController{
    static fetch(req,res,next){
        Product.find(function(err,data){
            if(err){
                next
            }else{
                res.status(200).json(data)
            }
        })
    }
    static create(req,res,next){
        Product.create({
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            picture: req.file.cloudStoragePublicUrl
        })
        .then(function(newdata){
            res.status(201).json(newdata)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Product.deleteOne({_id: req.params.productid},function(err,data){
            if(err){
                next
            }else{
                res.status(200).json(data)
            }
        })
    }

    static edit(req,res,next){
        console.log(req.body);
        
        Product.updateOne({_id: req.params.productid},{
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            picture: req.file.cloudStoragePublicUrl
        },function(err,raw){
            if(err){
                next
            }else{
                res.status(200).json(raw)
            }
        })
    }

    static updateStock(req,res,next){
        console.log(req.body);
        
            Product.updateOne({_id: req.params.productid},{
                stock : req.body.stock-1
            }, function(err,data){
                if (err) {
                    next
                } else {
                    res.status(200).json(data)
                }
            })
        
    }
}

module.exports = ProductController