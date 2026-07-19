import Auth from '../model/Auth.js';

/**
 * Finds a shop by either shopName or email.
 */
export const findShopByNameOrEmail = async (shopName, email) => {
    return await Auth.findOne({ $or: [{ shopName }, { email }] });
};

/**
 * Finds a shop exclusively by shopName.
 */
export const findShopByName = async (shopName) => {
    return await Auth.findOne({ shopName });
};

/**
 * Finds a shop by its ID, excluding the password field.
 */
export const findShopByIdWithoutPassword = async (shopId) => {
    return await Auth.findById(shopId).select('-password');
};

/**
 * Creates and saves a new shop to the database.
 */
export const createShop = async (shopData) => {
    const newShop = new Auth(shopData);
    return await newShop.save();
};
