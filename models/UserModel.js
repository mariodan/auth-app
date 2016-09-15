'use strict'


function User(data){
    this.email = data.email || ''
    this.firstName = data.firstName || ''
    this.lastName = data.lastName || ''
    this.passwd = data.passwd || ''
}

const M = User.prototype

M.instantiate = function(data){
    return new User(data)
}

M.db = function(db){
    this._db = db
    return this
}

M.find = function(){

}


module.exports = User
