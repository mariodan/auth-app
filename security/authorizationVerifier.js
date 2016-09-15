'use strict'
const settings = require('../configuration/settings')
const _ = require('underscore')
const _s = require('underscore.string')
const os = require('os')


const authorizationVerifier = function(req, res, next) {
    if(!req[settings.httpHeaderTokenName]) {
        let isAllowed = false
        _.each(settings.publicAPIList, function(endpoint){
            if(_s.startsWith(req.url.replace(settings.rootApiEndpoint,''), endpoint)) {
                isAllowed = true
            }
        }, this)
        if(isAllowed) {
            return next()
        } else {
            winston.error('[ authorizationVerifier ] ' + req.method + ' ' + req.url)
            return res.status(HTTP.UNAUTHORIZED).send()
        }
    } else {
        return next()
    }

}

module.exports = authorizationVerifier
