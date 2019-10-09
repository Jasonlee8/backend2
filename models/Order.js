'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderId: Number,
    email: String,
    itemTitle: String,
    itemQuantity: Number,
    totalPrice: Number,
    status: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('order', OrderSchema);





// 'use strict';

// const mongoose = require('mongoose');

// const {Schema} = mongoose;

// const OrderSchema = new Schema({
//     unitPrice: Number,
//     status: String
// });

// module.exports = mongoose.model('order', OrderSchema);