import * as billingService from '../services/billingService.js';

export const createInvoice = async (req, res) => {
    try {
        const { shopId, products, totalAmount, dueAmount, paidAmount , firstName , lastName ,phoneNumber} = req.body;
        const authHeader = req.headers.authorization;
        const invoice = await billingService.createInvoice(req.body, authHeader);
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const invoice = await billingService.getInvoiceById(req.params.id);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerInvoices = async (req, res) => {
    try {
        const invoices = await billingService.getInvoicesByCustomer(req.params.customerId);
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShopInvoices = async (req, res) => {
    try {
        const invoices = await billingService.getInvoicesByShop(req.params.shopId);
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePayment = async (req, res) => {
    try {
        const { paidAmount, dueAmount } = req.body;
        const invoice = await billingService.updatePayment(req.params.id, paidAmount, dueAmount);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
