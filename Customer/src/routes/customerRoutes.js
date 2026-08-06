import express from 'express';
import { 
    createProfile, 
    getCustomerByshopId, 
    updateProfile 
} from '../controller/customerController.js';

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
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.post('/', createProfile);

/**
 * @swagger
 * /api/customer/{shopId}:
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
router.get('/:shopId', getCustomerByshopId);

/**
 * @swagger
 * /api/customer/{shopId}:
 *   put:
 *     summary: Update customer profile
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/:shopId', updateProfile);

export default router;
