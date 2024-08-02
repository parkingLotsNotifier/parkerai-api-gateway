// src/middlewares/errorHandler.js
const logger = require('../logger/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(err.stack);
};

module.exports = errorHandler;
