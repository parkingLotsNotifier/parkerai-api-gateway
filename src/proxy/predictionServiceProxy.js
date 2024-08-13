const proxy = require("express-http-proxy");
const {
  PREDICTION_SERVICE_BASE_ADDRS,
  PREDICT_SERVICE_SERVICE_PORT_INFERENCE,
} = require("../../config/env");

const PREDICTION_SERVICE_URL = `${PREDICTION_SERVICE_BASE_ADDRS}:${PREDICT_SERVICE_SERVICE_PORT_INFERENCE}`;
const predictionServiceProxy = proxy(PREDICTION_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/predictions${req.url}`,
});

module.exports = predictionServiceProxy;
