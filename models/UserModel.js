'use strict'
const Model = require('../lib/Model')

const User = new Model('User', {
    id: '',
    email: '',
    lastName: '',
    firstName: '',
    passwordHash: '',
    lastLogin: 0,
    lastLogout: 0
}, global.DB)

module.exports = User