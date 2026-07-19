import * as productService from '../services/productService.js';

export const create = async (req, res) => {
    try {
        const shopId = req.user.shopId; // From verifyToken middleware
        const productData = req.body;
        
        // If an image was uploaded, attach its Cloudinary URL to the product data
        if (req.file) {
            productData.imageURL = req.file.path;
        }

        const product = await productService.addProduct(shopId, productData);
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

export const uploadImage = (req, res) => {
    try {
        // req.file is provided by Multer middleware
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }
        
        // Return the secure Cloudinary URL
        res.status(200).json({ 
            message: "Image uploaded successfully", 
            imageURL: req.file.path 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
