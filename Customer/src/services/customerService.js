import * as customerRepository from '../repository/customerRepository.js';

export const createProfile = async (data) => {
    return await customerRepository.create(data);
};

export const getCustomerByshopId = async (shopId) => {
    return await customerRepository.findByShopId(shopId);
};

export const getCustomerById = async (id) => {
    return await customerRepository.findById(id);
};

export const updateCustomer = async (id, updateData) => {
    return await customerRepository.updateById(id, updateData);
};

export const deleteCustomer = async (id) => {
    return await customerRepository.deleteById(id);
};

