'use strict'

const settings = {
    debugRequests: true,
    responseTimeThreshold: 500,
    version: 'v1.0',
    apiEndpoint: '/v1/api',
    sessionDuration: 1000 * 60 * 60 * 24 * 7,//1 week
    sessionSecret: 's e s s i o n s e c r e t',
    jwtAlgorithm: 'HS512',
    httpHeaderTokenName: 'auth-token',
    env: {
        API_PORT: 3000,
        API_HOST: 'localhost'
    },
    testUser: {
        id: 12332,
        email: 'admin@mydomain.com',
        firstName: 'John',
        lastName: 'Smith',
        passwd: 'abc$1234'
    }
}

module.exports = settings
