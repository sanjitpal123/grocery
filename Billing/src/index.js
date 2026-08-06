import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import billingRoutes from './routes/billingRoutes.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

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
            title: 'Billing Service API',
            version: '1.0.0',
            description: 'API documentation for the Billing Microservice',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
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
app.use('/api/billing', billingRoutes);

app.get('/', (req, res) => {
    res.send('Billing Service is running');
});

app.listen(PORT, () => {
    console.log(`Billing Service is running on port ${PORT}`);
});
