'use strict'

const passwordHash = require('password-hash')
const moment = require('moment')
const ErrorMessage = require('../common/ErrorMessage')

/**
 *
 * @param user
 * @returns {Promise}
 */
const validatePass = function(user, inputPassword){
    return new Promise(function(resolve, reject){
        if(passwordHash.verify(inputPassword, user.passwordHash)) {
            user.lastLogin = moment()
            return user.save().then(() => resolve(user))
        } else {
            winston.error('%s has tried to login with wrong password.', user.email)
            reject(new ErrorMessage('wrong_credentials', HTTP.UNAUTHORIZED, user.email))
        }
    })
}


module.exports = {
    validatePass
}