'use strict'

const UserValidator = require('../validators/userValidator')
const authService = require('../services/authService')
const settings = require('../configuration/settings')
const UserModel = require('../models/UserModel')
const securityUtils = require('../security/utils')
const utils = require('./utils')

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
        .then(user => authService.createSession(user, req))
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
const remove = function(req, res){
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
    const token = req.headers[settings.httpHeaderTokenName]
    Promise.resolve()
        .then(() => authService.decodeToken(token))
        .then(data => res.status(HTTP.OK).send(data))
        .catch(err => res.status(HTTP.UNAUTHORIZED).send(err))
}


module.exports = {
    createSession,
    remove,
    getCurrent: getSessionDetails
}
