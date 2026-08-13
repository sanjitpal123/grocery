import * as productService from '../services/productService.js';
const unitConversions = {
    kg: {
        g: 1000
    },
    l: {
        ml: 1000
    },
    dozen: {
        piece: 12
    },
    tra: {
        piece: 30
    }
};

export const create = async (req, res) => {
    try {
        const shopId = req.user.shopId; // From verifyToken middleware
        const productData = req.body;
        const conversionFactor = unitConversions[productData.baseUnit]?.[productData.secondaryUnit];
        productData.currentStock = productData.currentStock * conversionFactor;
        // If an image was uploaded, attach its Cloudinary URL to the product data
        if (req.file) {
            productData.imageUrl = req.file.path;
        }

        const product = await productService.addProduct(shopId, { ...productData, conversionFactor });
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const shopId = req.user.shopId;
        const products = await productService.getProductsForShop(shopId);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProductsByShopId = async (req, res) => {
    try {
        const shopId = req.params.shopId;
        const products = await productService.getProductsForShop(shopId);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const shopId = req.user.shopId;
        const productId = req.params.id;
        const updatedProduct = await productService.editProduct(shopId, productId, req.body);
        res.status(200).json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const addStock = async (req, res) => {
    try {
        const shopId = req.user.shopId;
        const productId = req.params.id;
        const { stockToAdd, unit, effective_date, purchasePrice, sellingPrice, prev_purchasePrice, prev_sellingPrice } = req.body;

        if (stockToAdd === undefined || stockToAdd <= 0) {
            return res.status(400).json({ message: "A valid positive stock amount must be provided to add stock" });
        }
        if (!unit) {
            return res.status(400).json({ message: "You must specify the unit of the stock you are adding" });
        }

        const updatedProduct = await productService.addStock(shopId, productId, req.body);
        res.status(200).json({ message: "Stock added successfully", product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const bulkDeductStock = async (req, res) => {
    try {
        const shopId = req.user.shopId;
        const { products } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "A valid array of products must be provided" });
        }

        const updatedProducts = await productService.bulkDeductStock(shopId, products);
        res.status(200).json({ message: "Stock deducted successfully", products: updatedProducts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const remove = async (req, res) => {
    try {
        const shopId = req.user.shopId;
        const productId = req.params.id;
        await productService.removeProduct(shopId, productId);
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

