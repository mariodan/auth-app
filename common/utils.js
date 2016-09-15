'use strict'

const wrapGet = function(instance, prop){
    return function(){
        return instance.get(prop)
    }
}

const wrapSet = function(instance, prop){
    return function(newValue){
        return instance.set(prop, newValue)
    }
}

module.exports = {
    wrapGet: wrapGet,
    wrapSet: wrapSet
}