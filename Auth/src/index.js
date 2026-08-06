import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import Connection from './config/Mongodb.js';
import swaggerDocs from './config/swagger.js';

dotenv.config();

const APP = express();

APP.use(cors());
APP.use(express.json());

// Swagger Setup
APP.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
APP.get('/api-docs.json', (req, res) => res.json(swaggerDocs));

// Routes
APP.use('/api/auth', authRoutes);

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

APP.listen(PORT, () => {
    console.log(`Auth server is running at ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
    Connection();
});
