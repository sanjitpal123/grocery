import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Monolithic Grocery API',
            version: '1.0.0',
            description: 'API documentation for the unified Grocery Backend',
        },
        servers: [
            {
                url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Grocery Monolithic API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
