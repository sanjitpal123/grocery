import mongoose from 'mongoose';

const authSchema = mongoose.Schema({
    shopName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    ownerName: { type: String, required: true },
    password: { type: String, required: true },
    shopType: { type: String, required: true },
    address: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Auth', authSchema);