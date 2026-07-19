import express from 'express';
import { create, getAll, update, remove, getProductsByShopId, uploadImage } from '../controller/productController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/products/upload-image:
 *   post:
 *     summary: Upload a product image to Cloudinary
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageURL:
 *                   type: string
 */
router.post('/upload-image', verifyToken, upload.single('image'), uploadImage);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product/Inventory management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product to inventory with an image
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - unitOfMeasure
 *               - pricePerUnit
 *               - stockQuantity
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               barcode:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The product image to upload
 *               unitOfMeasure:
 *                 type: string
 *                 enum: [kg, g, L, ml, dozen, piece, pack, box]
 *               pricePerUnit:
 *                 type: number
 *               stockQuantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post('/', verifyToken, upload.single('image'), create);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products for the logged-in shop
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', verifyToken, getAll);

/**
 * @swagger
 * /api/products/shop/{shopId}:
 *   get:
 *     summary: Get all products for a specific shop (Public)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shop
 *     responses:
 *       200:
 *         description: List of products belonging to the shop
 */
router.get('/shop/:shopId', getProductsByShopId);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pricePerUnit:
 *                 type: number
 *               stockQuantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put('/:id', verifyToken, update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/:id', verifyToken, remove);

export default router;
