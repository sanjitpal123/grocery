import Customer from '../model/Customer.js';

export const create = async (customerData) => {
    const customer = new Customer(customerData);
    return await customer.save();
};

export const findByShopId = async (shopId) => {
    return await Customer.find({ shopId });
};

export const findById = async (id) => {
    return await Customer.findById(id);
};

export const updateById = async (id, updateData) => {
    return await Customer.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteById = async (id) => {
    return await Customer.findByIdAndDelete(id);
};

