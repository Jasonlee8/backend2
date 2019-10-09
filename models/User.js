'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('user', UserSchema);