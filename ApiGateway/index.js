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
                url: `${process.env.AUTH_SERVICE_URL || 'https://grocery-auth.onrender.com'}/api-docs.json`,
                name: 'Auth Service'
            },
            {
                url: `${process.env.PRODUCTS_SERVICE_URL || 'https://grocery-products.onrender.com'}/api-docs.json`,
                name: 'Products Service'
            },
            {
                url: `${process.env.BILLING_SERVICE_URL || 'https://grocery-billing-9or4.onrender.com'}/api-docs.json`,
                name: 'Billing Service'
            },
            {
                url: `${process.env.CUSTOMER_SERVICE_URL || 'https://grocery-customer.onrender.com'}/api-docs.json`,
                name: 'Customer Service'
            }
        ]
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

// Gateway Routes

// 1. Auth Service Proxy
app.use('/api/auth', createProxyMiddleware({
    target: 'https://grocery-auth.onrender.com',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));

// 2. Products Service Proxy
app.use('/api/products', createProxyMiddleware({
    target: 'https://grocery-products.onrender.com',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));

// Future microservices can be added here
// 3. Billing Service Proxy
app.use('/api/billing', createProxyMiddleware({
    target: 'https://grocery-billing-9or4.onrender.com',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));

// 4. Customer Service Proxy
app.use('/api/customer', createProxyMiddleware({
    target: 'https://grocery-customer.onrender.com',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));
// app.use('/orders', createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));

// Root route for gateway health check
app.get('/', (req, res) => {
    res.json({ message: "API Gateway is running!" });
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
    console.log(`Routing /auth requests to ${process.env.AUTH_SERVICE_URL || 'https://grocery-auth.onrender.com'}`);
});
