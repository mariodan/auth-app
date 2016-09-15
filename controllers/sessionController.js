'use strict'


const UserValidator = require('../validators/userValidator')
const authService = require('../services/authService')
const settings = require('../configuration/settings')


/**
 * Create session
 * @param req
 * @param res
 */
const create = function(req, res){
    UserValidator
        .userLoginValidator(req)
        .then(() => authService.createSession(settings.testUser))
        .then(data => {
            res.setHeader(settings.httpHeaderTokenName, data.token)
            res.status(HTTP.OK).send(data)
        })
        .catch(err => {
            winston.error(err)
            res.status(HTTP.BAD_REQUEST).send()
        })
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
    authService
        .decodeToken(token)
        .then(data => res.status(HTTP.OK).send(data))
        .catch(err => res.status(HTTP.UNAUTHORIZED).send(err))
}

module.exports = {
    create: create,
    remove: remove,
    getCurrent: getSessionDetails
}
