import Auth from '../model/Auth.js';

/**
 * Finds a shop by either phone or email to prevent duplicates.
 */
export const findShopByPhoneOrEmail = async (phone, email) => {
    return await Auth.findOne({ $or: [{ phone }, { email }] });
};

/**
 * Finds a shop exclusively by phone number.
 */
export const findShopByPhone = async (phone) => {
    return await Auth.findOne({ phone });
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
