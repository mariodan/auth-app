
'use strict'

const sessionController = require('../controllers/sessionController')

module.exports = function(router){
    router.post(     '/login',  sessionController.create)
    router.delete(	 '/login',  sessionController.remove)
}
