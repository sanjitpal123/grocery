import express from 'express';
import { register, login, getProfile } from '../controller/authController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new shop
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shopName
 *               - email
 *               - phone
 *               - ownerName
 *               - password
 *               - shopType
 *             properties:
 *               shopName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               ownerName:
 *                 type: string
 *               password:
 *                 type: string
 *               shopType:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shop registered successfully
 *       400:
 *         description: Bad Request
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to an existing shop
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get the profile of the currently logged-in shop
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', verifyToken, getProfile);

export default router;
