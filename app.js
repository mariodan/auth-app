'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const middleware = require('./middleware/')
const handlers = require('./common/handlers')
const settings = require('./configuration/settings')
const router = require('express').Router()
const authenticationVerifier = require('./security/authenticationVerifier')
const authorizationVerifier = require('./security/authorizationVerifier')
const sqlite3 = require("sqlite3").verbose()
const initializeModels = require('./common/initializeModels')
const soap = require('soap-server')
const SoapSubscriptionHandler = require('./soap/SoapSubscriptionHandler')
const soapServer = new soap.SoapServer()
const soapService = soapServer.addService('subscriptionService', new SoapSubscriptionHandler())


/**
 * Globals
 */
global.winston  = require('winston')
global.HTTP = require('./common/HttpStatusCodes')
global.DB = new sqlite3.Database(path.join(__dirname, './db/', settings.dbFile))

const app = express()


initializeModels()

/**
 * Jade views
 */
//TODO might be switching to dot-template
/*
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.get('/', function (req, res) {
    res.render('login', { title: 'Hey', message: 'Hello there!'})
})
*/

/**
 * API doc
 */
app.use('/', middleware.htmls)


/**
 * Limits
 */
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


/**
 * Response time middleware. Logs which API how much time it spent responding
 */
app.use(middleware.responseTime)

/**
 * Basic request logging
 */
app.use(middleware.requestLogging)


/**
 * Handlers
 */
app.use(handlers.clientErrorHandler)
app.use(handlers.logErrors)


/**
 * Security middleware
 */
app.use(authenticationVerifier)
app.use(authorizationVerifier)


/**
 * Routes
 */
const routes = require('./routes/')(router)
app.use(settings.rootApiEndpoint, routes)

/**
 * Server start
 */
app.listen(settings.env.API_PORT, settings.env.API_HOST, function () {
    winston.info('[ environment ]: %s', process.env.NODE_ENV)
    winston.info('[ sqlite3 db file ] ' + settings.dbFile)
    winston.info('[ path ] Running from: ' + __dirname)
    winston.info('[ api ] ' + settings.version + ' running on http://%s:%s%s ', settings.env.API_HOST, settings.env.API_PORT, settings.rootApiEndpoint)
})

soapServer.listen(settings.env.SOAP_PORT, settings.env.API_HOST, function(){
    winston.info('[ soap server started ]: ' + settings.env.API_HOST + ':' + settings.env.SOAP_PORT)
})


module.exports = app
