import Product from '../model/Product.js';

export const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

export const findProductsByShopId = async (shopId) => {
    return await Product.find({ shopId });
};

export const findProductById = async (productId) => {
    return await Product.findById(productId);
};

export const updateProduct = async (productId, updateData) => {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

export const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
