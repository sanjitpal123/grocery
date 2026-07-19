import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth Microservice API',
            version: '1.0.0',
            description: 'API documentation for Auth Service'
        },
        servers: [
            {
                url: '/',
                description: 'Live API Gateway'
            }
        ],
    },
    // We now look for swagger annotations in the routes folder instead of controllers
    apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
