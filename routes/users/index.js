const { createError, json } = require('micro');
const compose = require('micro-compose');

module.exports.POST = compose()(
    async (req, res) => {
        const body = await json(req);
        console.log(body);
        
        const User = req.$mongoose.model('User');
        const user = new User();
        user.username = body.user.username;
        user.email = body.user.email;
        user.setPassword(body.user.password);

        await user.save();
        return user.toAuthJSON();
    }
);
