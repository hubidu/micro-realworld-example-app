const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let isConnected;

module.exports = {
    mongoConnect: async connectUrl => {
        if (!isConnected) {
            await mongoose.connect(connectUrl);
            isConnected = true;
        }
        
        return mongoose;
    }
}