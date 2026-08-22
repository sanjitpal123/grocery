import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String
    },
    pricePerUnit: {
        type: Number
    },
    subTotal: {
        type: Number
    }
})
const billingSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    shopId: {
        type: String
    },

    products: [productSchema],
    totalAmount: {
        type: Number
    },
    dueAmount: {
        type: Number
    },
    paidAmount: {
        type: Number
    },



}, { timestamps: true });

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
