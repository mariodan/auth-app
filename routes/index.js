/**
 * index.js
 * @param router
 * @returns {router}
 */

module.exports = function (router) {
    require('./users')(router)
    require('./subscription')(router)
    require('./session')(router)
    return router
}
