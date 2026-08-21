import * as customerService from '../services/customerService.js';

export const createProfile = async (req, res) => {
    try {
        const { shopId, phoneNumber, firstName, lastName, dueamount } = req.body;
        if (!shopId || !phoneNumber || !firstName) {
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

export const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const updateData = { ...req.body };
        // ensure no last name is edited
        delete updateData.lastName;

        const customer = await customerService.updateCustomer(req.params.id, updateData);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await customerService.deleteCustomer(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

