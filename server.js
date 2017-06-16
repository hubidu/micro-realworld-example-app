const { createError } = require('micro-boom')

/**
 * Read global middleware stack
 */
const middleware = require('./middleware.js')

/**
 * Exclude lib directory and tests from routes
 */
const routerConfig = {
    filter: f => f.indexOf('lib') === -1 && f.indexOf('.spec.js') === -1
}
const match = require('fs-router')(__dirname + '/routes', routerConfig);

module.exports = middleware(
    async function(req, res) {
        let matchedRoute = match(req)
        if (!matchedRoute) throw createError(404, 'Route not found')

        req.$routes = match._routes
        return await matchedRoute(req, res)
    }
)


