'use strict'
const Model = require('../lib/Model')

const User = new Model('User', {
    id: '',
    email: '',
    lastName: '',
    firstName: '',
    passwordHash: '',
    lastLogout: ''
}, global.DB)

module.exports = User