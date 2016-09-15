'use strict'
const settings = require('../configuration/settings')
const _s = require('underscore.string')
const authService = require('../services/authService')
const moment = require('moment')
const UserModel = require('../models/UserModel')

const authenticationVerifier = function(req, res, next){

    if (!req.headers[settings.httpHeaderTokenName]) {
        return next()
    }
    if (_s.isBlank(req.headers[settings.httpHeaderTokenName])) {
        return next()
    }

    const token = req.headers[settings.httpHeaderTokenName]
    let decodedSession = authService.decodeToken(token)

    if (!decodedSession.user || !decodedSession.user.id) { return res.status(HTTP.UNAUTHORIZED).send()}

    decodedSession.created = new Date(decodedSession.created)
    decodedSession.expires = new Date(decodedSession.expires)

    UserModel
        .findById(decodedSession.user.id)
        .then(user => {
            if(!user) {
                winston.error(`User ${decodedSession.user.id} not found!`)
                return res.status(HTTP.UNAUTHORIZED).send()
            } else if(moment() > decodedSession.expires) {
                winston.error(`[ 401 ] %s now() > ${decodedSession.expires}`, user.email )
                return res.status(HTTP.UNAUTHORIZED).send()
            } else if (user.lastLogin < user.lastLogout && user.lastLogout < decodedSession.expires) {
                winston.error(`[ 401 ] %s lastLogin < lastLogout && lastLogout < ${decodedSession.expires}`, user.email )
                return res.status(HTTP.UNAUTHORIZED).send()
            } else {
                req[settings.httpHeaderTokenName] = decodedSession
                req.currentUser = user
                next()
            }
        })
        .catch(err => {
            winston.error(err.stack)
            return res.status(HTTP.UNAUTHORIZED).send()
        })
}

module.exports = authenticationVerifier