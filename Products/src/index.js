import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import Connection from './config/Mongodb.js';
import swaggerDocs from './config/swagger.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const APP = express();

APP.use(cors());
APP.use(express.json());

// Swagger Setup
APP.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
APP.get('/api-docs.json', (req, res) => res.json(swaggerDocs));

// Routes
APP.use('/api/products', productRoutes);

// Global Error Handler (Prevents Swagger from hanging on Cloudinary/Multer errors)
APP.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({ 
        message: err.message || "Internal Server Error",
        error: err.toString()
    });
});

const PORT = process.env.PORT || 5001;

APP.listen(PORT, () => {
    console.log(`Products microservice is running at ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
    Connection();
});
