'use strict'
const express = require('express')
const _ = require('underscore')

module.exports = function(req, res, next) {
    const docs = express.static(__dirname + '/../public', {index:'login.html'})
    docs(req, res, next)
}
