const chai = require('chai');
const chaiHttp = require('chai-http');
const deleteAllUser = require('../helpers/deleteDataTesting')

const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

after(function(){
    deleteAllUser('user')
})
describe('Test users', function(){
    describe('post register', function(){
        it('should be an object with 201 status code',function(done){
            chai.request(app).post('/users/register')
            .send({email:'tviuty@yahoo.com', password: '12345', username: 'tviuty', role: 'customer'})
            .then(function(res){
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('role')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code',function(done){
            chai.request(app).post('/users/register')
            .send({email:'tviuty.yahoo', password: '12345', username: 'tviuty', role:'customer'})
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code',function(done){
            chai.request(app).post('/users/register')
            .send({email:'tviuty@yahoo.com', password: '123', username: 'tviuty', role:'customer'})
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code',function(done){
            chai.request(app).post('/users/register')
            .send({email:'vsuzy@yahoo.com', password: '', username: 'vsuzy', role:''})
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
    })
    describe('post login', function(){
        it('should be an access token with 200 status code',function(done){
            chai.request(app).post('/users/login')
            .send({email:'tviuty@yahoo.com', password: '12345'})
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        //kosong
        it('should be an object with 400 status code',function(done){
            chai.request(app).post('/users/login')
            .send({email:'', password: ''})
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        //email not valid
        it('should be an object with 400 status code',function(done){
            chai.request(app).post('/users/login')
            .send({email:'tviuty@ya', password: '12345'})
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
    })
})
