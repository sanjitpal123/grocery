import express from 'express';
import { 
    createInvoice, 
    getInvoiceById, 
    getCustomerInvoices, 
    getShopInvoices, 
    updatePayment 
} from '../controller/billingController.js';

const router = express.Router();

/**
 * @swagger
 * /api/billing:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               shopId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     productName:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     unit:
 *                       type: string
 *                     pricePerUnit:
 *                       type: number
 *                     subTotal:
 *                       type: number
 *               totalAmount:
 *                 type: string
 *               dueAmount:
 *                 type: string
 *               paidAmount:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */
router.post('/', createInvoice);

/**
 * @swagger
 * /api/billing/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice details
 */
router.get('/:id', getInvoiceById);

/**
 * @swagger
 * /api/billing/customer/{customerId}:
 *   get:
 *     summary: Get all invoices for a customer
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of customer invoices
 */
router.get('/customer/:customerId', getCustomerInvoices);

/**
 * @swagger
 * /api/billing/shop/{shopId}:
 *   get:
 *     summary: Get all invoices for a shop
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of shop invoices
 */
router.get('/shop/:shopId', getShopInvoices);

/**
 * @swagger
 * /api/billing/{id}/payment:
 *   put:
 *     summary: Update payment details for an invoice
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paidAmount:
 *                 type: string
 *               dueAmount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated
 */
router.put('/:id/payment', updatePayment);

export default router;
