const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.Schema.Types.ObjectId, // Corrected type
                ref: "Products"
            }
        ],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId, // Corrected type
            ref: 'Users'
        },
        status: {
            type: String,
            default: 'No Process',
            enum: ['No Process', 'Processing', 'Shipped', 'Delivered', 'Cancel']
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order
};
