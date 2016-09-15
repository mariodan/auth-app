'use strict'

const sessionController = require('../controllers/sessionController')

module.exports = function(router){
    router.get('/session',      sessionController.getCurrent)
    router.post('/session',     sessionController.create)
    router.delete('/session',   sessionController.remove)
    return router
}
