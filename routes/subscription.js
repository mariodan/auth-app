'use strict'

const subscriptionController = require('../controllers/subscriptionController')

module.exports = function(router){
    router.get('', subscriptionController.find)
    router.put('', subscriptionController.update)
    router.post('', subscriptionController.create)
    router.delete('', subscriptionController.remove)
}
