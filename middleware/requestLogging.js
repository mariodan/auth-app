'use strict'
const settings = require('../configuration/settings')


/**
 * Basic Request logging
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){
    if(settings.debugRequests) {
        winston.info(req.method + ' ' + req.url + ' ' + req.headers['user-agent'])
    }
    next()
}