const proxy = require('express-http-proxy');
const { USER_MANAGMENT_SERVICE_BASE_ADDRS, USER_MANAGMENT_SERVICE_PORT } = require('../../config/env');

const CAMERA_SERVICE_URL = `${USER_MANAGMENT_SERVICE_BASE_ADDRS}:${USER_MANAGMENT_SERVICE_PORT}`;
console.log(CAMERA_SERVICE_URL)
const cameraServiceProxy = proxy(CAMERA_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/data-managment${req.url}`,
});

module.exports = cameraServiceProxy;
