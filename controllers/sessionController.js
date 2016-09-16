'use strict'

const UserValidator = require('../validators/userValidator')
const authService = require('../services/authService')
const settings = require('../configuration/settings')
const UserModel = require('../models/UserModel')
const securityUtils = require('../security/SecurityUtils')
const utils = require('./ControllerUtils')
const ErrorMessage = require('../common/ErrorMessage')

/**
 * Create session
 * @param req
 * @param res
 */
const createSession = function(req, res){
    const email = req.body.email
    const passwd = req.body.password
    const logResponse = utils.curried.log(res)

    UserValidator
        .userLoginValidator(req)
        .then(() => UserModel.findByEmail(email))
        .then(user => securityUtils.validatePass(user, passwd))
        .then(user => authService.createSession(user))
        .then(data => {
            res.setHeader(settings.httpHeaderTokenName, data.token)
            res.status(HTTP.OK).send(data)
        })
        .catch(err => logResponse(err, HTTP.UNAUTHORIZED, `invalid_login: ${email}`))
}


/**
 * Remove session
 * @param req
 * @param res
 */
const removeSession = function(req, res){
    authService
        .removeSession(req)
        .then(() => res.status(HTTP.OK).send())
        .catch(() => res.status(HTTP.UNAUTHORIZED).send())
}


/**
 * Get session details for logged in user
 * @param req
 * @param res
 * @returns {*}
 */
const getSessionDetails = function(req, res){
    const logResponse = utils.curried.log(res)

    const token = req.headers[settings.httpHeaderTokenName]
    Promise.resolve()
        .then(() => {
            const decodedSession = authService.decodeToken(token)
            return decodedSession instanceof Error ? Promise.reject(decodedSession) : Promise.resolve(decodedSession)
        })
        .then(data => res.status(HTTP.OK).send(data))
        .catch(err => logResponse(err, HTTP.UNAUTHORIZED, `unauthorized_request`))
}


module.exports = {
    create: createSession,
    remove: removeSession,
    getCurrent: getSessionDetails
}
