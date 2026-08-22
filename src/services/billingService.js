import * as billingRepository from '../repository/billingRepository.js';
import * as productService from './productService.js';

export const createInvoice = async (data, authHeader) => {
    const { firstName, lastName, phoneNumber, shopId, products } = data;
    // Call Products service to deduct stock directly
    if (products && products.length > 0) {
        try {
            await productService.bulkDeductStock(shopId, products);
        } catch (error) {
            console.error("Failed to deduct stock:", error.message);
            throw new Error(`Products deduction failed: ` + error.message);
        }
    }
    return await billingRepository.create(data, authHeader);
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
