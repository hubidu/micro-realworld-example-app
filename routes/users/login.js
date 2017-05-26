const { createError, text, json } = require('micro');
const compose = require('micro-compose');

const formdata = require('./lib/formdata.js');
const User = require('./lib/user-model.js');

module.exports.POST = compose()(
    async (req, res) => {
        const body = await formdata(req);

        const email = body['user[email]'];
        const password = body['user[password]'];

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
