'use strict'
const settings = require('../configuration/settings')
const curry = require('curry')
const _ = require('underscore')

const curried = {
    log: curry(function(res, errObject, httpCode, responseMessage){
        if(_.isArray(errObject)) return res.status(HTTP.NOT_ACCEPTABLE).send(errObject)
        if(errObject && _.has(errObject,'stack')) {
            if(settings.debugRequests) winston.error(errObject.message || responseMessage, errObject.stack)
            else winston.error(errObject.message || responseMessage)
        } else {
            winston.error(errObject.message || responseMessage)
        }

        res.status(errObject.httpCode || httpCode).send(errObject)
        return
    })
}

module.exports = {
    curried
}