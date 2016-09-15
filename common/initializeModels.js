'use strict'
const models = require('./modelsRequire')
const Promise = require('bluebird')
const _ = require('underscore')


function initializeModels() {
    let db = global.DB

    Promise.promisifyAll(db)
    const UserModel = new models['UserModel']
    UserModel.instantiate(db)
    global.UserModel = UserModel
}

module.exports = initializeModels
