const { createError } = require('micro');
const compose = require('micro-compose');

const User = require('./lib/user-model.js');
const populateById = require('./lib/populate-by-id.js');
// TODO Implement login on post

module.exports = compose(
    // TODO auth is required here
    populateById
)(
    async (req, res) => {
        return req.user.toAuthJSON();
    }
);

