const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    localOrderId: {
        type: String,
        required: true,
        unique: true
    },
    supplierOrderId: {
        type: String,
        default: null
    },
    customerInfo: {
        name: String,
        phone: String,
        address: String,
        city: String
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        },
        priceAtPurchase: Number
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'sent_to_supplier', 'shipped', 'delivered', 'returned', 'cancelled'],
        default: 'pending'
    },
    courierStatus: {
        type: String,
        default: null
    },
    profit: {
        type: Number,
        default: 0
    },
    returnReason: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
