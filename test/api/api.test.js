/* global describe:true,it:true,setupDb:true,expect:true,UserModel:true,testData:true,useFileDb:true */
'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const api = require('../../app')
const should = chai.should()
chai.use(chaiHttp)


describe('REST API test', function () {
    const db = useFileDb()
    let userId
    it('should get a list of existing users', function(done) {
        chai.request(api)
            .get('/v1/api/users')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body[0].should.have.property('id')
                done()
            })
    })


    it('should get a user by id', function(done) {
        chai.request(api)
            .get('/v1/api/users/1')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.should.have.property('id')
                done()
            })
    })


    it('should add a new user', function(done) {
        const newUser = testData.userCreate
        newUser.email = Math.random()*100  + newUser.email
        chai.request(api)
            .post('/v1/api/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.should.have.property('id')
                userId = res.body.id
                done()
            })
    })

    it('should delete a new user', function(done) {
        chai.request(api)
            .delete('/v1/api/users/' + userId)
            .end((err, res) => {
                res.should.have.status(204)
                done()
            })
    })

})
