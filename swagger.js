import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;
const host = process.env.HOST_URL || `localhost:${port}`;

const doc = {
    info: {
        title: 'CRUD USUARIOS API',
        description: 'API Endpoints for User CRUD',
    },
    host,
    schemes: process.env.HOST_URL ? ['https'] : ['http'],
};

const outputFile = './src/document/swagger.json';
const endpointsFiles = ['./src/routes/router.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);