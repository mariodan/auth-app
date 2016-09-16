'use strict'

const Chance = require('chance')
const jwt = require('jwt-simple')
const moment = require('moment')
const settings = require('../configuration/settings')
const _ = require('underscore')
const _s = require('underscore.string')
const ErrorMessage = require('../common/ErrorMessage')
const UserModel = require('../models/UserModel')
const securityUtils = require('../security/SecurityUtils')


/**
 * Create user session
 * @param user
 * @returns {{token: String}}
 */
const createSession = function(user){
    const chance = new Chance()
    const key = chance.guid()

    const now = moment()
    const expires = moment().add(settings.sessionDuration, 'milliseconds')

    const session = {
        key: key,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            lastLogin: user.lastLogin,
            language: user.language
        },
        created: now,
        expires: expires
    }

    const encodedSession = jwt.encode(session, settings.sessionSecret, settings.jwtAlgorithm)

    return {
        token: encodedSession
    }
}


/**
 * Create session
 * @param req
 * @param res
 */
const getToken = function(email, pass){
    UserModel.findByEmail(email)
        .then(user => securityUtils.validatePass(user, pass))
        .then(user => createSession(user))
        .then(data => data.token)
}


/**
 * Decode session data
 * @param token
 * @returns {*}
 */
const decodeToken = function(token){
    let decodedSessionData
    if(!token.length || !token || token == '') return new ErrorMessage('No token session available', HTTP.UNAUTHORIZED, '')

    try {
        decodedSessionData = jwt.decode(token, settings.sessionSecret, settings.jwtAlgorithm)
    } catch (e) {
        winston.error(`Token ${token} invalid!`)
    }
    return decodedSessionData

}


/**
 * Remove session
 * @param req
 * @returns {Promise}
 */
const removeSession = function(req){
    return new Promise(function(resolve, reject){
        if(req.currentUser) {
            req.currentUser.lastLogout = new Date()
            req.currentUser
                .save()
                .then(user => {
                    winston.info(req.currentUser.email + ' has logged out.')
                    resolve()
                })
                .catch(err => reject(Error('error_logging_out')))
        } else {
            reject(Error('unauthorized'))
        }
    })
}


module.exports = {
    createSession: createSession,
    removeSession: removeSession,
    decodeToken: decodeToken,
    getToken: getToken
}
