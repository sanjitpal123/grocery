import * as authRepository from '../repository/authRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Registers a new shop in the database.
 */
export const registerUser = async (shopData) => {
    const { shopName, email, phone, ownerName, password, shopType, address } = shopData;

    // 1. Check if user already exists via Repository
    const existingShop = await authRepository.findShopByNameOrEmail(shopName, email);
    if (existingShop) {
        throw new Error("Shop name or email already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to DB via Repository
    const newShopData = {
        shopName,
        email,
        phone,
        ownerName,
        password: hashedPassword,
        shopType,
        address
    };

    const newShop = await authRepository.createShop(newShopData);
    return newShop;
};

/**
 * Verifies credentials and generates a JWT.
 */
export const loginUser = async (shopName, password) => {
    // 1. Find the user via Repository
    const shop = await authRepository.findShopByName(shopName);
    if (!shop) {
        throw new Error("Invalid credentials");
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // 3. Generate Token
    const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';
    const token = jwt.sign(
        { shopId: shop._id, shopType: shop.shopType, shopName: shop.shopName },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
};

/**
 * Retrieves the profile of a shop by its ID.
 */
export const getShopProfile = async (shopId) => {
    // Fetch the shop via Repository
    const shop = await authRepository.findShopByIdWithoutPassword(shopId);
    if (!shop) {
        throw new Error("Shop not found");
    }
    return shop;
};
