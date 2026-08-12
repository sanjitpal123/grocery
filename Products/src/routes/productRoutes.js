import express from 'express';
import { create, getAll, update, remove, getProductsByShopId, addStock } from '../controller/productController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';

const router = express.Router();

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
 *               - baseUnit
 *               - purchasePrice
 *               - sellingPrice
 *               - currentStock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The product image to upload
 *               baseUnit:
 *                 type: string
 *                 enum: [kg, g, ml, pcs, dozen, l, packet,tra]
 *               secondaryUnit:
 *                 type: string
 *                 description: e.g., Carton, Box (Optional)
 *               conversionFactor:
 *                 type: number
 *                 description: e.g., 12 (1 Carton = 12 pieces)
 *               purchasePrice:
 *                 type: number
 *               sellingPrice:
 *                 type: number
 *               priceUnit:
 *                 type: string
 *                 description: e.g., g, kg
 *               currentStock:
 *                 type: number
 *                 description: Starting stock in baseUnit
 *               lowStockAlert:
 *                 type: number
 *                 description: Alert threshold
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
 * /api/products/{id}/add-stock:
 *   post:
 *     summary: Add stock to an existing product with automatic conversion factor
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
 *             required:
 *               - stockToAdd
 *               - unit
 *             properties:
 *               stockToAdd:
 *                 type: number
 *                 description: The amount of stock to add
 *               unit:
 *                 type: string
 *                 description: The unit of the stock being added (must match the product's baseUnit or secondaryUnit)
 *               effective_date:
 *                 type: string
 *                 format: date
 *                 description: Effective date for the added stock
 *               purchasePrice:
 *                 type: number
 *                 description: New purchase price for the product
 *               sellingPrice:
 *                 type: number
 *                 description: New selling price for the product
 *               prev_purchasePrice:
 *                 type: number
 *                 description: Previous purchase price
 *               prev_sellingPrice:
 *                 type: number
 *                 description: Previous selling price
 *     responses:
 *       200:
 *         description: Stock added successfully
 *       400:
 *         description: Bad request
 */
router.post('/:id/add-stock', verifyToken, addStock);


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
 *               purchasePrice:
 *                 type: number
 *               sellingPrice:
 *                 type: number
 *               currentStock:
 *                 type: number
 *               lowStockAlert:
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