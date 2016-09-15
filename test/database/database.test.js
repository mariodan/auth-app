/* global describe:true,it:true,setupDb:true,expect:true */

'use strict'

describe('Database', function () {
    const db = global.db

    it('should have a valid DB instance', function (done) {
        db.should.have.property('open')
        expect(db.open).to.be.true
        done()
    })

})