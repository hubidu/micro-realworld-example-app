const { connect } = require('./mongoose-connect');
const User = require('./routes/users/lib/user-model');

connect()
    .then(() => {
        const user = new User({
            username: 'foobar',
            email: 'foo@bar.de',
        });
        console.log(user.toJSON());
        user.setPassword('baz');
        return user.save();
    })
    .then(() => {
        process.exit();
    })
    .catch(err => {
        process.exit();
    });
