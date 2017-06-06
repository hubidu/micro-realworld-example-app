const { send } = require('micro');
const { handleErrors, createError } = require('micro-boom')
const compose = require('micro-compose');
const visualize = require('micro-visualize');

const isMongooseValidationError = (err) => err.name === 'ValidationError'

const { provideContext } = require('./provide-context.js');
const { handleMongooseErrors } = require('./micro-mongoose')

const routerConfig = {
    filter: f => f.indexOf('lib') === -1 && f.indexOf('.spec.js') === -1
}
const match = require('fs-router')(__dirname + '/routes', routerConfig);

const ctx = require('./context')

ctx.routes = match._routes

module.exports = compose(
    handleErrors,
    handleMongooseErrors,
    provideContext(ctx)
)(visualize(
    async function(req, res) {
        let matched = match(req)
        if (!matched) throw createError(404, 'Route not found')

        return await matched(req, res)
    }, process.env.NODE_ENV
));


