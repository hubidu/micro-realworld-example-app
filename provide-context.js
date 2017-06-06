const ctx = require('./context');

const provideContext = (ctx) => fn => async (req, res) => {
    req.$ctx = ctx;
    return fn(req, res)
}

module.exports = {
    /**
     * Read contextual data (like shared database models) and provide to each lambda function
     * in req.ctx
     */
    provideContext
}