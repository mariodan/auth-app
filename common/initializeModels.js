'use strict'
const models = require('./modelsRequire')
const Promise = require('bluebird')
const _ = require('underscore')

function initializeModels(dbTest) {
    let db = global.DB
    if(dbTest) {
        db = dbTest
    }
    let UserModel = require('../models/UserModel')

    Promise.promisifyAll(db)
    UserModel = UserModel.instantiate(db)
    global.UserModel = UserModel
}

module.exports = initializeModels
