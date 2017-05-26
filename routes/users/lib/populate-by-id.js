const { createError } = require('micro');

const User = require('./user-model.js');

module.exports = exports = (fn) => {
    return async (req, res) => {
        const id = req.params.id;

        try {
            const user = await User.findById(id);
            if (!user) throw createError(404, `No user with id ${id}`);
            req.user = user;

            return fn(req, res);
        } catch (err) {
            throw createError(500, `Unexpected error - ${err}`)
        }
    }
}
