'use strict'
const subscriptionService = require('../services/subscriptionService')

function SoapSubscriptionHandler(){
    console.log('Soap initiated')
}

SoapSubscriptionHandler.prototype.deleteSubscription = function(idSubscription){
    return subscriptionService.deleteSubscription(idSubscription)
}

module.exports = SoapSubscriptionHandler
