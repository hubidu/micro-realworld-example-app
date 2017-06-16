const compose = require('micro-compose');
const { handleErrors } = require('micro-boom')
const visualize = require('micro-visualize');

const { provideContext } = require('./provide-context.js');
const { handleMongooseErrors } = require('./micro-mongoose')
const ctx = require('./context')

const visualizeCurried = fn => visualize(fn, process.env.NODE_ENV)
const handleErrorsCurried = fn => handleErrors(fn, process.env.NODE_ENV !== 'production')

module.exports = compose(
    visualizeCurried,
    handleErrorsCurried,
    handleMongooseErrors,
    provideContext(ctx)
)
