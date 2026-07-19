import * as authService from '../services/authService.js';

export const register = async (req, res) => {
    try {
        // Validation happens in controller
        const { shopName, email, phone, ownerName, password, shopType } = req.body;
        if (!shopName || !email || !phone || !ownerName || !password || !shopType) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Delegate heavy lifting to the service
        const newShop = await authService.registerUser(req.body);
        
        // Return response
        res.status(201).json({ message: "Shop registered successfully", shopId: newShop._id });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(400).json({ message: error.message || "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { shopName, password } = req.body;
        if (!shopName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Delegate heavy lifting to the service
        const token = await authService.loginUser(shopName, password);

        // Return response
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(400).json({ message: error.message || "Internal server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        // req.user is populated by the verifyToken middleware
        const shopId = req.user.shopId;
        
        // Delegate to service
        const profile = await authService.getShopProfile(shopId);
        
        res.status(200).json(profile);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(400).json({ message: error.message || "Internal server error" });
    }
};
