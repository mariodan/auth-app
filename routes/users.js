'use strict'

const userController = require('../controllers/userController')

module.exports = function(router){
    router.get(      '/users/:id',                             userController.findById)
    router.get(      '/users',                                 userController.listAll)
    router.put(      '/users/:id',                             userController.update)
    router.post(     '/users',                                 userController.create)
    router.delete(	 '/users/:id',                             userController.remove)
}
