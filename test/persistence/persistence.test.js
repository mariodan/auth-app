/* global describe:true,it:true,setupDb:true,expect:true,UserModel:true,testData:true */
'use strict'


describe('Models', function () {
    const db = global.db
    let userId = 0
    it('should have users in table', function(done) {
        UserModel
            .findAll()
            .then(users => {
                users.should.be.a('array')
                users[0].should.have.property('id')
                userId = users[0].id
                done()
            })
            .catch(err => done(err))
    })


    it('should get a user details', function(done) {
        UserModel
            .findById(userId)
            .then(user => {
                user.should.have.property('id')
                user.id.should.equal(userId)
                done()
            })
            .catch(err => done(err))
    })


    it('should add a new user', function(done) {
        UserModel
            .add(testData.userCreate)
            .then(user => {
                user.data.should.have.property('id')
                user.data.email.should.equal(user.email)
                done()
            })
            .catch(err => done(err))
    })

    it('should delete a new user', function(done) {
        done()
    })

})