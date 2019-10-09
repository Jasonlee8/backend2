'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const MenuSchema = new Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    quantity: Number
});

module.exports = mongoose.model('menu', MenuSchema);