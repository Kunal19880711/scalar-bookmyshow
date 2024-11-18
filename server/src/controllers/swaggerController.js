const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const app = express();

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scalar BookMyMovie API Documentation',
      version: '1.0.0',
      description: 'API documentation for Scalar BookMyMovie',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/bms`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Paths to files with API annotations
};

// Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec
}

// // Serve Swagger docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));
