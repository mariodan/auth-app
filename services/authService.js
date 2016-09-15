'use strict'

const Chance = require('chance')
const jwt = require('jwt-simple')
const moment = require('moment')
const settings = require('../configuration/settings')


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
 * Decode session data
 * @param token
 * @returns {*}
 */
const decodeToken = function(token){
    let decodedSessionData
    if(!token) return Error('No token session available')
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
        //TODO implement after persistence is done
        reject(Error('unimplemented'))
    })
}


module.exports = {
    createSession: createSession,
    removeSession: removeSession,
    decodeToken: decodeToken
}
