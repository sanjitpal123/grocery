import mongoose from 'mongoose';
const customerSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    }

}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
