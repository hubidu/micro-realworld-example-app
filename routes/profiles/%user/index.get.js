const compose = require('micro-compose');
const { createError } = require('micro-boom')
const jwtAuth = require('micro-jwt-auth')

const autoparams = require('./lib/auto-params.js');

module.exports = compose(
    jwtAuth(process.env.JWT_SECRET, false),
    autoparams({
        paramNameMap: {
            user: 'username'
        }
    })
)(
    async (req, res) => {
        const profile = req.$user

        if (req.jwt) {
            const User = req.$ctx.User
            const authenticatedUser = await User.findById(req.jwt.id)
            if (!authenticatedUser) return profile.toProfileJSONFor(false)

            return profile.toProfileJSONFor(authenticatedUser)
        }

        return profile.toProfileJSONFor(false)
    }
);

