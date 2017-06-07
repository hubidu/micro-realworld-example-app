const { json } = require('micro');
const compose = require('micro-compose');

/**
 * Create a new user by POSTing username, email and password
 */
module.exports = compose()(
    async (req, res) => {
        const body = await json(req)
        
        const User = req.$ctx.User
        const user = new User()
        user.username = body.user.username
        user.email = body.user.email
        user.setPassword(body.user.password)

        await user.save()
        return user.toAuthJSON()
    }
);
