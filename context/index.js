const { mongoConnect } = require('./mongo-connect.js');
const User = require('./user-model.js')

// TODO Why cant i use await
const mongoose = mongoConnect('mongodb://localhost/micro-realworld-example-app')

module.exports = {
    mongoose,
    User
}