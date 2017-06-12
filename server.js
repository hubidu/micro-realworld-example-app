const { createError } = require('micro-boom')

const middleware = require('./middleware.js')

const routerConfig = {
    filter: f => f.indexOf('lib') === -1 && f.indexOf('.spec.js') === -1
}
const match = require('fs-router')(__dirname + '/routes', routerConfig);

module.exports = middleware(
    async function(req, res) {
        let matched = match(req)
        if (!matched) throw createError(404, 'Route not found')

        req.$routes = match._routes
        return await matched(req, res)
    }
)


