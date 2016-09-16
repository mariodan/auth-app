'use strict'

function ErrorMessage(message, httpCode, variable) {
    this.status = 'error'
    this.type = 'Exception'
    this.message = message
    this.httpCode = httpCode
    this.variable = variable
    this.stack = (new Error()).stack
}
ErrorMessage.prototype = new Error

module.exports = ErrorMessage