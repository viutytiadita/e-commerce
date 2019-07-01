const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const deleteAllCart = require('../helpers/deleteDataTesting')

chai.use(chaiHttp);
const expect = chai.expect;

let tokenUSer = ""
let idUser = ""
let idProduct = ""
let idCart= ""

after(function () {
    deleteAllCart('cart')
})

before(function (done) {
    chai
        .request(app)
        .post("/users/login")
        .send({ email: 'tviuty@yahoo.com', password: '12345' })
        .then(function (res) {
            idUser = res.body._id
            tokenUSer = res.body.token
            done()
        })
        .catch(function (err) {
            console.log(err);
        })
})

describe('Test Cart', function () {
    describe('GET / products/ carts', function () {
        it('should be an array with 200 status code', function (done) {
            chai.request(app).get('/products/carts')
                .set('token', tokenUSer)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
    before(function(done){
        chai
        .request(app)
        .post("/products")
        .set('token', tokenUSer)
        .send({ name: 'basic shirt', category: 'pakaian', price: 80000, user_id: idUser})
        .then(function (res) {
            idProduct= res.body._id
            done()
        })
        .catch(function (err) {
            console.log(err);
        })
    })
    describe('POST / products/carts', function () {
        it('should be an object with 201 status code', function (done) {
            chai.request(app).post('/products/carts')
                .set('token', tokenUSer)
                .send({ user_id: idUser, product_id: idProduct })
                .then(function (res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user_id')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('product_id')
                    idCart = res.body._id
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 201 status code', function (done) {
            chai.request(app).post('/products/carts')
                .send({ user_id: idUser, product_id: idProduct })
                .then(function (res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
    describe('Delete / products/carts/', function () {
        it('should be an object with 200 status code', function (done) {
            chai.request(app).delete(`/products/carts/${idCart}`)
                .set('token', tokenUSer)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code', function (done) {
            chai.request(app).delete(`/products/carts/${idCart}`)
                .then(function (res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
})