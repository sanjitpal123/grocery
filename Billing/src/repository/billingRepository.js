import Billing from '../model/Billing.js';

export const create = async (billingData) => {
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
