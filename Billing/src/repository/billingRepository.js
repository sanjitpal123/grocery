import Billing from '../model/Billing.js';
import Customer from '../model/Customer.js';
import axios from 'axios';
import mongoose from 'mongoose';

export const create = async (billingData, authHeader) => {
    if (!billingData.customerId) {
        const firstName = billingData.firstName || "Walk-in";
        const lastName = billingData.lastName || "Customer";
        const phoneNumber = billingData.phoneNumber || "0000000000";
        const shopId = billingData.shopId;
        const dueamount = billingData.dueAmount;

        let customerId;
        try {
            const customerDoc = await Customer.create({
                firstName,
                lastName,
                phoneNumber,
                shopId,
                dueamount
            });
            customerId = customerDoc._id.toString();
        } catch (err) {
            throw new Error(`Database error creating walk-in customer: ` + err.message);
        }

        if(!customerId) {
            throw new Error("Customer creation failed"); 
        }
        billingData.customerId = customerId;
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
