const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scalar BookMyMovie API Documentation",
      version: "1.0.0",
      description: "API documentation for Scalar BookMyMovie",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/bms`,
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // Paths to files with API annotations
};

// Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
