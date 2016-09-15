'use strict'

const sessionController = require('../controllers/sessionController')

module.exports = function(router){
    router.get('/session',      sessionController.getCurrent)
    router.post('/session',     sessionController.create)

    return router
}
