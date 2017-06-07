const compose = require('micro-compose');

const autoparams = require('./lib/auto-params.js');

module.exports = compose(
    // TODO auth is required here
)(
    async (req, res) => {
        const User = req.$ctx.User

        return await User.find()
    }
);
