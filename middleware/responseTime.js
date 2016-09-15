'use strict'
const responseTime = require('response-time')
const settings = require('../configuration/settings')

module.exports = responseTime(function(req, res, time){
    time = parseInt(time)
    if(time > settings.responseTimeThreshold) {
        winston.warn(req.method + ' ' + req.url + ' took ' + parseInt(time) +
            'ms to respond. Please review implementation/consider caching.')
    }
})
