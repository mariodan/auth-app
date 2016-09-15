'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const middleware = require('./middleware/')
const handlers = require('./common/handlers')
const settings = require('./configuration/settings')
const router = require('express').Router()
const sqlite3 = require("sqlite3").verbose()
const initializeModels = require('./common/initializeModels')

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
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'jade')


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
 * Routes
 */
const routes = require('./routes/')(router)
app.use(settings.apiEndpoint, routes)

/**
 * Server start
 */
app.listen(settings.env.API_PORT, settings.env.API_HOST, function () {
    winston.info('[ environment ]: %s', process.env.NODE_ENV)
    winston.info('[ sqlite3 db file ] ' + settings.dbFile)
    winston.info('[ path ] Running from: ' + __dirname)
    winston.info('[ api ] ' + settings.version + ' running on http://%s:%s%s ', settings.env.API_HOST, settings.env.API_PORT, settings.apiEndpoint)
})


module.exports = app
