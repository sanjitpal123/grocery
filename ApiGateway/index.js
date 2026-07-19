import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(morgan('dev')); // Logs requests to the console

// Centralized Swagger UI Configuration
const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        urls: [
            {
                url: 'http://localhost:5000/api-docs.json',
                name: 'Auth Service'
            },
            {
                url: 'http://localhost:5001/api-docs.json',
                name: 'Products Service'
            }
        ]
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

// Gateway Routes

// 1. Auth Service Proxy
app.use('/auth', createProxyMiddleware({ 
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:5000', 
    changeOrigin: true,
    pathRewrite: {
        '^/auth': '/api/auth' // rewrite /auth/register to /api/auth/register
    }
}));

// 2. Products Service Proxy
app.use('/products', createProxyMiddleware({ 
    target: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:5001', 
    changeOrigin: true,
    pathRewrite: {
        '^/products': '/api/products'
    }
}));

// Future microservices can be added here
// app.use('/orders', createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));

// Root route for gateway health check
app.get('/', (req, res) => {
    res.json({ message: "API Gateway is running!" });
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    console.log(`Routing /auth requests to ${process.env.AUTH_SERVICE_URL || 'http://localhost:5000'}`);
});
