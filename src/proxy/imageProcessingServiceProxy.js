const proxy = require("express-http-proxy");
const {
  IMAGE_PROCESSING_SERVICE_BASE_ADDRS,
  IMAGE_PROCESSING_PORT,
} = require("../../config/env");

const IMAGE_PROCESSING_SERVICE_URL = `${IMAGE_PROCESSING_SERVICE_BASE_ADDRS}:${IMAGE_PROCESSING_PORT}`;
const imageProcessingServiceProxy = proxy(IMAGE_PROCESSING_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/image-processing${req.url}`,
});

module.exports = imageProcessingServiceProxy;
