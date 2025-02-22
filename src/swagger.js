const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'authToken', // Nombre de la cookie donde se guarda el token
                    description: 'JWT almacenado en cookies httpOnly'
                }
            }
        },
        security: [{
            cookieAuth: []
        }]
    },
    apis: ['./src/routes/*.js', './src/models/*.js', './src/dtos/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;
