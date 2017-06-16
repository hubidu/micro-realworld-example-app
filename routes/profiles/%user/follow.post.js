const compose = require('micro-compose');
const { createError } = require('micro-boom')
const jwtAuth = require('micro-jwt-auth')

const resolveJwt = require('./lib/resolve-jwt')
const autoparams = require('./lib/auto-params.js')

/**
 * Follow the user given by :username
 */
module.exports = compose(
    jwtAuth(process.env.JWT_SECRET),
    resolveJwt(),
    autoparams({
        paramNameMap: {
            user: 'username'
        }
    })
)(
    async (req, res) => {
        const profile = req.$user
        const authenticatedUser = req.$authenticatedUser

        await authenticatedUser.follow(profile._id)

        return profile.toProfileJSONFor(authenticatedUser)
    }
);

