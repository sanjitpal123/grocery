import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products Microservice API',
            version: '1.0.0',
            description: 'API documentation for Products Service',
        },
        servers: [
            {
                url: '/',
                description: 'Live API Gateway'
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
