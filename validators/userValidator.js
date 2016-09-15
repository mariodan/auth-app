'use strict'


const userLoginValidator = function(req){
    if (!req.body.email) return Promise.reject(Error('email_missing'))
    if (!req.body.password) return Promise.reject(Error('password_missing'))
    return Promise.resolve()
}


module.exports = {
    userLoginValidator: userLoginValidator
}