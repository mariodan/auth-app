'use strict'
const UserModel = require('../models/UserModel')
const passwordHash = require('password-hash')


/**
 * Delete
 * @param req
 * @param res
 */
const deleteUser = function(req, res){
    UserModel
        .findById(req.params.id)
        .then(user => user.delete())
        .then(() => res.status(HTTP.NO_CONTENT).send())
        .catch(err => res.status(HTTP.NOT_FOUND).send({error: err.message}))
}

/**
 * Add
 * @param req
 * @param res
 */
const addUser = function(req, res){
    UserModel
        .add(req.body)
        .then(user => res.status(HTTP.OK).send(user.data))
        .catch(err => {
            console.log(err.stack)
            res.status(HTTP.INTERNAL_SERVER_ERROR).send(err)
        })
}

/**
 * Update
 * @param req
 * @param res
 */
const updateUser = function(req, res){
    UserModel
        .findById(req.params.id)
        .then(user => {
            user.email = req.body.email || user.email
            user.firstName = req.body.firstName || user.firstName
            user.lastName = req.body.lastName || user.lastName
            user.passwordHash = req.body.passwordHash ? passwordHash.generate(req.body.passwordHash) : user.passwordHash
            return user.save()
        })
        .then(user => res.status(HTTP.OK).send(user.data))
        .catch(err => {
            res.status(HTTP.NOT_FOUND).send()
        })
}

/**
 * Find by id
 * @param req
 * @param res
 */
const findById = function(req, res){
    UserModel
        .findById(req.params.id)
        .then(user => res.status(HTTP.OK).send(user.data))
        .catch(err => res.status(HTTP.NOT_FOUND).send(err))
}

/**
 * List all
 * @param req
 * @param res
 */
const listAll = function(req, res){
    UserModel
        .findAll()
        .then(users => res.status(HTTP.OK).send(users))
        .catch(err => {
            res.status(HTTP.INTERNAL_SERVER_ERROR).send(err)
        })
}


module.exports = {
    remove: deleteUser,
    update: updateUser,
    create: addUser,
    findById: findById,
    listAll: listAll
}