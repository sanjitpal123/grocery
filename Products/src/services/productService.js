import * as productRepository from '../repository/productRepository.js';

export const addProduct = async (shopId, productData) => {
    // Validate unit of measure
    const validUnits = ['kg', 'g', 'L', 'ml', 'dozen', 'piece', 'pack', 'box'];
    if (!validUnits.includes(productData.unitOfMeasure)) {
        throw new Error(`Invalid unit of measure. Allowed: ${validUnits.join(', ')}`);
    }

    if (productData.pricePerUnit < 0 || productData.stockQuantity < 0) {
        throw new Error("Price and stock quantity cannot be negative");
    }

    // Attach shopId to the product
    const newProduct = { ...productData, shopId };
    return await productRepository.createProduct(newProduct);
};

export const getProductsForShop = async (shopId) => {
    return await productRepository.findProductsByShopId(shopId);
};

export const editProduct = async (shopId, productId, updateData) => {
    const product = await productRepository.findProductById(productId);
    
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.shopId.toString() !== shopId) {
        throw new Error("Unauthorized to edit this product");
    }

    return await productRepository.updateProduct(productId, updateData);
};

export const removeProduct = async (shopId, productId) => {
    const product = await productRepository.findProductById(productId);
    
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.shopId.toString() !== shopId) {
        throw new Error("Unauthorized to delete this product");
    }

    return await productRepository.deleteProduct(productId);
};
