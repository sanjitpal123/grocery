import * as customerRepository from '../repository/customerRepository.js';

export const createProfile = async (data) => {
    return await customerRepository.create(data);
};

export const getCustomerByshopId = async (shopId) => {
    return await customerRepository.findByShopId(shopId);
};

export const updateProfile = async (shopId, updateData) => {
    return await customerRepository.updateByShopId(shopId, updateData);
};
