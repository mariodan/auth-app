'use strict'


const testData = {
    userCreate : {
        "email": "test@mytest.com",
        "passwordHash": "mypass",
        "firstName": "Test First Name",
        "lastName": "Test Last Name",
        "lastLogin": 0,
        "lastLogout": 0
    },
    loginEmail: "test@mytest.com",
    loginPass: "mypass",
    loginUser: {
        "email": "admin@mydomain.com",
        "password": "secret#123"
    }
}

module.exports = {
    testData
}