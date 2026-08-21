import Billing from '../model/Billing.js';
import axios from 'axios';

export const create = async (billingData, authHeader) => {
    if (!billingData.customerId) {
        const firstName = billingData.firstName || "Walk-in";
        const lastName = billingData.lastName || "Customer";
        const phoneNumber = billingData.phoneNumber || "0000000000";
        const shopId = billingData.shopId;
        const dueamount = billingData.dueAmount;

        const customerUrl = process.env.CUSTOMER_SERVICE_URL || 'https://grocery-customer.onrender.com';
        let customer;
        try {
            customer = await axios.post(`${customerUrl}/api/customer`, {firstName, lastName, phoneNumber, shopId}, {
                headers: { authorization: authHeader, 'User-Agent': 'Mozilla/5.0' }
            });
        } catch (err) {
            throw new Error(`Customer API (${customerUrl}) failed: ` + (err.response?.data?.message || err.message));
        }

        if (!customer || !customer.data) {
            throw new Error("Customer creation failed");
        }
        billingData.customerId = customer.data._id;
    }

    return await Billing.create(billingData);
};
export const findById = async (id) => {
    return await Billing.findById(id);
};
export const findByCustomerId = async (customerId) => {
    return await Billing.find({ customerId });
};
export const findByShopId = async (shopId) => {
    return await Billing.find({ shopId });
};
export const updatePayment = async (id, paidAmount, dueAmount) => {
    return await Billing.findByIdAndUpdate(id, { paidAmount, dueAmount }, { new: true });
};
