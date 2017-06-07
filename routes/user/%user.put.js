const { json } = require('micro')
const compose = require('micro-compose');
const { createError } = require('micro-boom')
const jwtAuth = require('micro-jwt-auth')

const autoparams = require('./lib/auto-params.js');

module.exports = compose(
    jwtAuth('secret'),
    autoparams
)(
    async (req, res) => {
        const user = req.$user
        if (!user) {
            throw createError(401, `No such user ${req.params.user}`);
        }
        const userUpdate = await json(req).user

        console.log(userUpdate)

        return user.toAuthJSON()
    }
);

