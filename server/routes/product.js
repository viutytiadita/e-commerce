const express = require('express')
const productRouter = express.Router()
const ProductController = require('../controllers/product')
const CartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const imageUpload = require('../middlewares/imageUpload')

productRouter.get('/',ProductController.fetch)
productRouter.use(authentication)
productRouter.use('/:cartid',authorization)
productRouter.post('/',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ProductController.create)
productRouter.delete('/:productid',ProductController.delete)
productRouter.put('/:productid',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ProductController.edit)
productRouter.patch('/:productid',ProductController.updateStock)
productRouter.get('/carts',CartController.fetch)
productRouter.post('/carts',CartController.create)
productRouter.delete('/carts/:cartid',CartController.delete)
productRouter.patch('/carts/:cartid',CartController.updateCount)
productRouter.get('/carts/:productid',CartController.fetchOne)


module.exports = productRouter