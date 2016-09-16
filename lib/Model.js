'use strict'
const Queries = require('../common/queries')
const _ = require('underscore')
const utils = require('../common/utils')

const Model = module.exports = function(label, properties, db){
    this.label = label || {}
    this.fields = properties || {}
    this.__db = db
    this.data = {}
}

const M = Model.prototype

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
    const _self = this
    const instance = this.instantiateHelper.call(_self)
    instance.populateFromDatabaseData(userData)
    return instance
}

M.getFields = function(){
    return _.keys(this.fields)
}

M.instantiateHelper = function() {
    var instance = new Model(this.label, this.properties, this.__db)
    instance.db(this.db())
    instance.data = {}
    instance.fields = this.fields

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
    for (var key in this.fields) {
        if (userData.hasOwnProperty(key)) {
            var value = userData[key]
            this.set(key, value)
        } else if(this.fields.hasOwnProperty(key)) {
            this.set(key, null)
        }
    }
}

M.set = function(property, value){
    if(_.isUndefined(property)) return this
    this.data[property] = value || null
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
    const _self = this
    return new Promise((resolve, reject) => {
        this.db().all(Queries.USER.getAll, function(err, rows){
            if(err) reject(err)
            if(rows.length) {
                const users = _.map(rows, user => M.instantiateFromDb.call(_self, user))
                resolve(_.map(users, user => user.data))
            } else {
                resolve([])
            }
        })
    })
}


M.findById = function(userId){
    const id = parseInt(userId, 10)
    const _self = this
    return new Promise((resolve, reject) => {
        this.db().get(Queries.USER.findById, {$id: id}, function(err, row){
            if(err) reject(err)
            if(!row) reject(Error('User not found'))
            resolve(M.instantiateFromDb.call(_self, row))
        })
    })
}


M.findByEmail = function(email){
    const _self = this
    return new Promise((resolve, reject) => {
        this.db().get(Queries.USER.findByEmail, [email], function(err, row){
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

        let query = Queries.USER.save
        if(this['lastLogout']) {
            query = query.replace(' WHERE', ', lastLogout = $lastLogout WHERE')
            values['$lastLogout'] = this['lastLogout']
        }

        this.db().run(query, values, function(err){
            if(err) reject(err)
            resolve(_self)
        })
    })
}

M.add = function(inputData){
    const _self = this
    const user = M.instantiateFromDb.call(_self, inputData)
    return new Promise((resolve, reject) => {
        const values = {
            $email: user.get('email'),
            $firstName: user.get('firstName'),
            $lastName: user.get('lastName'),
            $passwordHash: user.get('passwordHash'),
            $lastLogin: user.get('lastLogin'),
            $lastLogout: user.get('lastLogout')
        }

        this.db().run(Queries.USER.add, values, function(err){
            if(err) reject(err)
        })
        /**
         * We need to get the user.id
         */
        this.db().get(Queries.USER.findByEmail, [user.get('email')], function(err, row){
            if(err) reject(err)
            const newUser = M.instantiateFromDb.call(user, row)
            resolve(newUser)
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



module.exports = Model

