const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    slug: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    image: {
        data: Buffer,
        contentType: String,
    },

    shipping: {
        type: String,
    },
}, { timestamps: true })

const Product = mongoose.model('Products', productSchema);

module.exports = {
    Product
}