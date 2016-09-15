'use strict'

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        winston.error({error: err.name + ' - ' + err.message})
        res.send(500, { error: 'Internal server error' })
    } else {
        try {
            JSON.parse(req.body)
        } catch(syntaxerror) {
            winston.error({error: err.name + ' - ' + err.message})
            res.status(500).send({error: err.name + ' - ' + err.message})
        }
        next()
    }
}

function logErrors(err, req, res, next) {
    winston.error(err.stack)
    next(err)
}

module.exports = {
    clientErrorHandler: clientErrorHandler,
    logErrors: logErrors
}
