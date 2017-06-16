const { createError } = require('micro-boom')

const ctx = require('./context');

const isMongooseValidationError = (err) => err.name === 'ValidationError'

const handleMongooseErrors = fn => async (req, res) => {
    try {
        return await fn(req, res)
    } catch (err) {
        if (isMongooseValidationError(err)) {
            throw createError(422, 'Mongoose validation error', {
                message: err._message
            })
        }
        throw err // pass on
    }    
}

module.exports = {
    handleMongooseErrors
}