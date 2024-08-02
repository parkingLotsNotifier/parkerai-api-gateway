const proxy = require('express-http-proxy');
const {IMAGE_SERVICE_BASE_ADDRS,IMAGE_SERVICE_PORT} = require('../../config/env')

const IMAGE_PROCESSING_SERVICE_URL = `${IMAGE_SERVICE_BASE_ADDRS}:${IMAGE_SERVICE_PORT}`; // Change to the correct URL of the image-processing service

const imageProcessingServiceProxy = proxy(IMAGE_PROCESSING_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/image-processing${req.url}`
});

module.exports = imageProcessingServiceProxy;
