import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Auth' // Just a conceptual reference since Auth is in another DB
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    barcode: {
        type: String
    },
    imageURL: {
        type: String
    },
    unitOfMeasure: {
        type: String,
        enum: ['kg', 'g', 'L', 'ml', 'dozen', 'piece', 'pack', 'box'],
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
