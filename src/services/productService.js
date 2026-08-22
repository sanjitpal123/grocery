import * as productRepository from '../repository/productRepository.js';

export const addProduct = async (shopId, productData) => {
    // Validate baseUnit
    const validUnits = ['kg', 'g', 'l', 'ml', 'dozen', 'pcs', 'packet', 'tra'];

    // toLowerCase handles if they send 'L' instead of 'l'
    if (!validUnits.includes(productData.baseUnit?.toLowerCase())) {
        throw new Error(`Invalid base unit. Allowed: ${validUnits.join(', ')}`);
    }

    if (productData.sellingPrice < 0 || productData.purchasePrice < 0 || productData.currentStock < 0) {
        throw new Error("Prices and stock quant  ity cannot be negative");
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
export const addStock = async (shopId, productId, payload) => {
    const { stockToAdd, unit, effective_date, purchasePrice, sellingPrice, prev_purchasePrice, prev_sellingPrice } = payload;
    const product = await productRepository.findProductById(productId);

    if (!product) {
        throw new Error("Product not found");
    }
    if (product.shopId.toString() !== shopId) {
        throw new Error("Unauthorized to update stock for this product");
    }

    let stockToAddInBaseUnit = 0;

    // Check which unit the user is adding stock in
    if (unit.toLowerCase() === product.baseUnit.toLowerCase()) {
        // If adding in base unit (e.g. kg), we must multiply by conversion factor to store in the smaller unit (g)
        stockToAddInBaseUnit = stockToAdd * (product.conversionFactor || 1);
    } else if (product.secondaryUnit && unit.toLowerCase() === product.secondaryUnit.toLowerCase()) {
        // If adding in secondary unit (e.g. g), no conversion needed because it's already the smaller unit
        stockToAddInBaseUnit = stockToAdd;
    } else {
        throw new Error(`Invalid unit. Must be either the base unit (${product.baseUnit}) or secondary unit (${product.secondaryUnit})`);
    }

    // Pure calculation: existing stock + incoming stock (converted to base unit)
    const newStock = product.currentStock + stockToAddInBaseUnit;
    
    const updateData = { currentStock: newStock };
    
    if (effective_date !== undefined) updateData.effective_date = effective_date;
    if (purchasePrice !== undefined) updateData.purchasePrice = purchasePrice;
    if (sellingPrice !== undefined) updateData.sellingPrice = sellingPrice;
    if (prev_purchasePrice !== undefined) updateData.prev_purchasePrice = prev_purchasePrice;
    if (prev_sellingPrice !== undefined) updateData.prev_sellingPrice = prev_sellingPrice;

    return await productRepository.updateProduct(productId, updateData);
};


export const bulkDeductStock = async (shopId, productsToDeduct) => {
    const updatedProducts = [];
    for (const item of productsToDeduct) {
        const { productId, quantity, unit } = item;
        const product = await productRepository.findProductById(productId);

        if (!product) {
            throw new Error(`Product not found: ${productId}`);
        }
        if (product.shopId.toString() !== shopId) {
            throw new Error(`Unauthorized to update stock for product: ${productId}`);
        }

        let quantityInBaseUnit = 0;
        
        // Use the unit specified, defaulting to baseUnit if not provided
        const deductUnit = unit || product.baseUnit;

        if (deductUnit.toLowerCase() === product.baseUnit.toLowerCase()) {
            quantityInBaseUnit = quantity * (product.conversionFactor || 1);
        } else if (product.secondaryUnit && deductUnit.toLowerCase() === product.secondaryUnit.toLowerCase()) {
            quantityInBaseUnit = quantity;
        } else {
            throw new Error(`Invalid unit for product ${product.name}. Must be either the base unit (${product.baseUnit}) or secondary unit (${product.secondaryUnit})`);
        }

        const newStock = product.currentStock - quantityInBaseUnit;
        if (newStock < 0) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        const updated = await productRepository.updateProduct(productId, { currentStock: newStock });
        updatedProducts.push(updated);
    }
    return updatedProducts;
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
