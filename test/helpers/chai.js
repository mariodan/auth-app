/* global before:true,after:true */


'use strict'
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const utils = require('./utils')
const queries = require('../../common/queries')
const sqlite3 = require('sqlite3').verbose()
const initializeModels = require('../../common/initializeModels')

chai.use(chaiAsPromised)
global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert
global.should = chai.should()



function setupDb() {
    const db = new sqlite3.Database(':memory:')
    global.db = db
    initializeModels(db)
    db.exec(queries.TEST.USER.createTable)
    db.exec(queries.TEST.USER.insertRecord)
}

setupDb()
global.testData = utils.testData
