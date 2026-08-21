import * as billingRepository from '../repository/billingRepository.js';
import axios from 'axios';

export const createInvoice = async (data, authHeader) => {
    const { firstName, lastName, phoneNumber, shopId, products } = data;
    // Call Products service to deduct stock
    if (products && products.length > 0) {
        try {
            const productsUrl = process.env.PRODUCTS_SERVICE_URL || 'https://grocery-products.onrender.com';
            await axios.post(`${productsUrl}/api/products/bulk-deduct`, {
                products
            }, {
                headers: {
                    authorization: authHeader,
                    'User-Agent': 'Mozilla/5.0'
                }
            });
        } catch (error) {
            console.error("Failed to deduct stock:", error.response?.data || error.message);
            throw new Error(`Products API (${productsUrl}) failed: ` + (error.response?.data?.message || error.message));
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
