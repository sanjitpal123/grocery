import express from 'express';
import {
    createProfile,
    getCustomerByshopId,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from '../controller/customerController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

/**
 * @swagger
 * /api/customer:
 *   post:
 *     summary: Create a new customer profile
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               dueamount:
 *                type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.post('/', verifyToken, createProfile);

/**
 * @swagger
 * /api/customer/shop/{shopId}:
 *   get:
 *     summary: Get customer by shopId
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 */
router.get('/shop/:shopId', verifyToken, getCustomerByshopId);

/**
 * @swagger
 * /api/customer/{id}:
 *   get:
 *     summary: Get customer by customer ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 */
router.get('/:id', verifyToken, getCustomerById);

/**
 * @swagger
 * /api/customer/{id}:
 *   put:
 *     summary: Update customer by customer ID
 *     tags: [Customer]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
router.put('/:id', verifyToken, updateCustomer);

/**
 * @swagger
 * /api/customer/{id}:
 *   delete:
 *     summary: Delete customer by customer ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.delete('/:id', verifyToken, deleteCustomer);

export default router;
