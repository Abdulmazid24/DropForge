const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    supplierProductId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    costPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    stockStatus: {
        type: String,
        enum: ['in_stock', 'out_of_stock', 'discontinued'],
        default: 'in_stock'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
