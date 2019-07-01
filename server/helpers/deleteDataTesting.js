const User = require('../models/user');
const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = function (modelName,done) {
    if (process.env.NODE_ENV === 'test') {
        if (modelName == 'user') {
            User.deleteMany({})
                .then(function () {
                    console.log('user collection deleted!');
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else if (modelName == 'product') {
            Product.deleteMany({})
                .then(function () {
                    console.log('product collection deleted!');
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                });
        }else if (modelName == 'cart') {
            Cart.deleteMany({})
                .then(function () {
                    console.log('cart collection deleted!');
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
}