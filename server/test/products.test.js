const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const deleteAllProduct = require('../helpers/deleteDataTesting')

chai.use(chaiHttp);
const expect = chai.expect;

let tokenUSer = ""
let idProduct = ""

after(function () {
    deleteAllProduct('product')
})

before(function (done) {
    chai
        .request(app)
        .post("/users/login")
        .send({ email: 'tviuty@yahoo.com', password: '12345' })
        .then(function (res) {
            tokenUSer = res.body.token
            done()
        })
        .catch(function (err) {
            console.log(err);
        })
})


describe.only('CRUD products', function () {
    describe('GET / products', function () {
        it('should be an array with 200 status code', function (done) {
            chai.request(app).get('/products')
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
    
    describe('POST / products', function () {
        it('should be an object with 201 status code', function (done) {
            chai.request(app).post('/products')
                .set('token', tokenUSer)
                .send({ name: 'basic shirt', category: 'pakaian', price: 80000, picture: 'storage.googleapis.com/dhed73d3uheuh'})
                .then(function (res) {
                    console.log(res.body)
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('picture')
                    expect(res.body.price).to.be.a('number')
                    idProduct = res.body._id

                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 400 status code', function (done) {
            chai.request(app).post('/products')
                .set('token', tokenUSer)
                .send({ name: '', category: '', price: '' , picture: ''})
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code', function (done) {
            chai.request(app).post('/products')
                .send({ name: 'lovely dress', category: 'pakaian', price: 20000 , picture: 'storage.googleapis.com/dhed73d3uheuh'})
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
        it('should be an object with 400 status code', function (done) {
            chai.request(app).post('/products')
                .set('token', tokenUSer)
                .send({ name: 'basic shirt', category: 'pakaian', price: -500 , picture: 'storage.googleapis.com/dhed73d3uheuh'})
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
    describe('Delete / products', function () {
        it('should be an object with 200 status code', function (done) {
            chai.request(app).delete(`/products/${idProduct}`)
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
            chai.request(app).delete(`/products/${idProduct}`)
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
    describe('Edit / products', function () {
        it('should be an object with 200 status code', function (done) {
            chai.request(app).put(`/products/${idProduct}`)
                .send({ name: 'cute shirt', category: 'pakaian', price: 20000 , picture: 'storage.googleapis.com/dhed73d3uheuh'})
                .set('token', tokenUSer)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('price')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 400 status code', function (done) {
            chai.request(app).put(`/products/${idProduct}`)
                .set('token', tokenUSer)
                .send({ name: '', category: '', price: '', picture: 'storage.googleapis.com/dhed73d3uheuh'})
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code', function (done) {
            chai.request(app).put(`/products/${idProduct}`)
                .send({ name: 'lovely dress', category: 'pakaian', price: 20000 ,picture: 'storage.googleapis.com/dhed73d3uheuh'})
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
        it('should be an object with 400 status code', function (done) {
            chai.request(app).put(`/products/${idProduct}`)
                .set('token', tokenUSer)
                .send({ name: 'basic shirt', category: 'pakaian', price: -500, picture: 'storage.googleapis.com/dhed73d3uheuh'})
                .then(function (res) {
                    expect(res).to.have.status(400)
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