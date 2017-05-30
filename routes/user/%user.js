const { createError } = require('micro');
const compose = require('micro-compose');

const User = require('./lib/user-model.js');
const autoparams = require('./lib/auto-params.js');

module.exports = compose(
    // TODO auth is required here
    autoparams
)(
    async (req, res) => req.$user.toAuthJSON()
);

