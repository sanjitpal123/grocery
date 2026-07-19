import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Grocery Products API',
            version: '1.0.0',
            description: 'Inventory Management API for Grocery App',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5001}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
    },
    apis: ['./src/routes/*.js'], 
};

export default swaggerJsDoc(swaggerOptions);
