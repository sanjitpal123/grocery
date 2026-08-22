import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    // --- 1. IDENTITY ---
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    brand: {
        type: String
    },
    imageUrl: {
        type: String
    },

    // --- 2. BASE UNIT (The most important field) ---
    baseUnit: {
        type: String,
        required: true,
        enum: ['kg', 'g', 'ml', 'pcs', 'dozen', 'l', 'packet', 'tra'], // Your custom strict counting units
        lowercase: true
    },

    // --- 3. PURCHASING (Secondary Unit - Optional) ---
    secondaryUnit: {
        type: String,
        trim: true // e.g., 'Carton', 'Sack'
    },
    conversionFactor: {
        type: Number,
        default: 1 // If no secondary unit, 1 piece = 1 piece
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },
    // --- 4. SELLING ---
    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    },
    prev_sellingPrice: {
        type: Number
    },
    prev_purchasePrice: {
        type: Number
    },
    // For loose items (e.g., Rs 50 "per" "1000" "Gram")

    priceUnit: {
        type: String,
        trim: true
    },
    // --- 5. INVENTORY MEMORY ---
    // ALWAYS stored in the baseUnit (e.g., 50000 ml)
    currentStock: {
        type: Number,
        required: true,
        min: 0
    },
    lowStockAlert: {
        type: Number,
        default: 5 // Warns you if stock drops below this number
    },
    effective_date: {
        type: Date
    }
}, {
    timestamps: true // Automatically tracks when you created or updated the product
});

export default mongoose.model('Product', productSchema);