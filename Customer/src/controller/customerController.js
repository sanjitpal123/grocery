import * as customerService from '../services/customerService.js';

export const createProfile = async (req, res) => {
    try {
        const { shopId, phoneNumber, firstName, lastName } = req.body;
        if (!shopId || !phoneNumber || !firstName || !lastName) {
            return res.status(400).json({ message: "shopId, phoneNumber, firstName, and lastName are required" });
        }

        const profile = await customerService.createProfile(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerByshopId = async (req, res) => {
    try {
        const customer = await customerService.getCustomerByshopId(req.params.shopId);
        if (!customer || customer.length === 0) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

