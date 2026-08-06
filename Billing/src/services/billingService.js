import * as billingRepository from '../repository/billingRepository.js';

export const createInvoice = async (data) => {
    return await billingRepository.create(data);
};

export const getInvoiceById = async (id) => {
    return await billingRepository.findById(id);
};

export const getInvoicesByCustomer = async (customerId) => {
    return await billingRepository.findByCustomerId(customerId);
};

export const getInvoicesByShop = async (shopId) => {
    return await billingRepository.findByShopId(shopId);
};

export const updatePayment = async (id, paidAmount, dueAmount) => {
    return await billingRepository.updatePayment(id, paidAmount, dueAmount);
};
