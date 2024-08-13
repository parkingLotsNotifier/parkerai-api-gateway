const proxy = require("express-http-proxy");
const {
  PREDICTION_SERVICE_BASE_ADDRS,
  PREDICTION_SERVICE_PORT,
} = require("../../config/env");

const PREDICTION_SERVICE_URL = `${PREDICTION_SERVICE_BASE_ADDRS}:${PREDICTION_SERVICE_PORT}`;
const predictionServiceProxy = proxy(PREDICTION_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/predictions${req.url}`,
});

module.exports = predictionServiceProxy;
