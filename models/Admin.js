'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('admin', AdminSchema);