import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de controle de Estoque',
        version: '1.0.0',
        description: 'Documentações da API',
    },
    servers: [
        {
            url: 'http://localhost:4000',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

export default setupSwagger;