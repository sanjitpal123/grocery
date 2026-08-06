import Customer from '../model/Customer.js';

export const create = async (customerData) => {
    const customer = new Customer(customerData);
    return await customer.save();
};

export const findByShopId = async (shopId) => {
    return await Customer.find({ shopId });
};

export const updateByShopId = async (shopId, updateData) => {
    return await Customer.findOneAndUpdate({ shopId }, updateData, { new: true });
};
