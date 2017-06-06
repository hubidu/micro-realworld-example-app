const ctx = require('./context');

const handleMongooseErrors = () => fn => async (req, res) => {
    try {
        return fn(req, res)
    } catch (err) {
        if (isMongooseValidationError(err)) {
            throw createError(400, 'Mongoose validation error', {
                message: err._message
            })
        }
        throw err // pass on
    }    
}

module.exports = {
    handleMongooseErrors
}