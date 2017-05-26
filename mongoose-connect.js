const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    connect: () => mongoose.connect('mongodb://localhost/micro-realworld-example-app')
}