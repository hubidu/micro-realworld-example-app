const { text, json } = require('micro')
const { createError } = require('micro-boom')
const compose = require('micro-compose')

const formdata = require('./lib/formdata.js');

module.exports = compose()(
    async (req, res) => {
        const body = await formdata(req);

        const email = body['user[email]'];
        const password = body['user[password]'];

        const User = req.$ctx.User;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw createError(403, `No user with email ${email}`);
        }
        if (!user.validPassword(password)) {
            throw createError(403, `Password does not match`);
        }
        return user.toAuthJSON()
    }
);
