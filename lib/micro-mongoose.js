const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = {
    mongoConnect: connectUrl => fn => {
        let isConnected;
        return async (req, res) => {
            if (!isConnected) {
                console.log(`Connecting to ${connectUrl}`);
                await mongoose.connect(connectUrl);
                isConnected = true;
            }

            try {
                return fn(req, res);
            } catch (err) {
                throw createError(500, `Unexpected error - ${err}`)
            }
        }
    }
}