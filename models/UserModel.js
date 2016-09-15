'use strict'
const Queries = require('../common/queries')
const _ = require('underscore')
const utils = require('../common/utils')

function User(){
    this.data = {}
}

const fields = {
    'id': '',
    'email': '',
    'firstName': '',
    'lastName': '',
    'passwordHash': '',
    'lastLogout': ''
}
const M = User.prototype

M.instantiate = function(db){
    this.__db = db
    return this
}

M.instance = function(){
    return this
}

M.db = function(db){
    if(!db) return this.__db
    this.__db = db
    return this.__db
}

M.instantiateFromDb = function(userData){
    var instance = this.instantiateHelper()
    instance.populateFromDatabaseData(userData)
    return instance
}

M.getFields = function(){
    return Object.keys(fields)
}

M.instantiateHelper = function() {
    var instance = new User()
    instance.db(this.db())
    instance.data = {}

    const properties = {}
    _.each(this.getFields(), prop => {
        properties[prop] = {
            get: utils.wrapGet(instance, prop),
            set: utils.wrapSet(instance, prop),
            enumerable: true,
            configurable: true
        }
    })

    Object.defineProperties(instance, properties)

    return instance
}

M.populateFromDatabaseData = function(userData){
    for (var key in userData) {
        if (userData.hasOwnProperty(key)) {
            var value = userData[key]
            this.set(key, value)
        }
    }
}

M.set = function(property, value){
    if(_.isUndefined(property) || _.isUndefined(value)) return this
    this.data[property] = value
}


M.get = function(property) {
    if(this.data.hasOwnProperty(property)) {
        return this.data[property]
    }
    throw new Error(`No such model property: ${property} !`)
}


M.populate = function(data) {
    for (var key in data) {
        var value = data[key]
        if (data.hasOwnProperty(key)) {
            this.set(key, value)
        }
    }
}


M.findAll = function(){
    return new Promise((resolve, reject) => {
        this.db().all(Queries.USER.getAll, function(err, rows){
            if(err) reject(err)
            const users = _.map(rows, user => M.instantiateFromDb(user))
            resolve(_.map(users, user => user.data))
        })
    })
}


M.findById = function(userId){
    const id = parseInt(userId, 10)
    const _self = this
    return new Promise((resolve, reject) => {
        this.db().each(Queries.USER.findById, [id], function(err, row){
            if(err) reject(err)
            resolve(M.instantiateFromDb.call(_self, row))
        })
    })
}

M.save = function(){
    const _self = this
    _self.set('email', this['email'])
    _self.set('firstName', this['firstName'])
    _self.set('lastName', this['lastName'])
    _self.set('passwordHash', this['passwordHash'])

    return new Promise((resolve, reject) => {
        const values = {
            $email: this['email'],
            $firstName: this['firstName'],
            $lastName: this['lastName'],
            $passwordHash: this['passwordHash'],
            $id: parseInt(this['id'], 10)
        }

        this.db().run(Queries.USER.save, values, function(err){
            if(err) reject(err)
            resolve(_self)
        })
    })
}

M.add = function(inputData){
    const user = M.instantiateFromDb(inputData)
    return new Promise((resolve, reject) => {
        const values = {
            $email: user.get('email'),
            $firstName: user.get('firstName'),
            $lastName: user.get('lastName'),
            $passwordHash: user.get('passwordHash')
        }

        this.db().run(Queries.USER.add, values, function(err){
            if(err) reject(err)
            resolve(user)
        })
    })
}


M.delete = function(){
    const _self = this
    return new Promise((resolve, reject) => {
        this.db().run(Queries.USER.delete, [_self.get('id')], function(err, row){
            if(err) reject(err)
            resolve()
        })
    })
}



module.exports = User