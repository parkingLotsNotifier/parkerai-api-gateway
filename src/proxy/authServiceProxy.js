// src/proxy/authProxy.js
const proxy = require("express-http-proxy");
const {
  AUTH_SERVICE_BASE_ADDRS,
  AUTH_SERVICE_PORT,
} = require("../../config/env");

const AUTH_SERVICE_URL = `${AUTH_SERVICE_BASE_ADDRS}:${AUTH_SERVICE_PORT}`;
const authServiceProxy = proxy(AUTH_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/auth${req.url}`,
});

module.exports = authServiceProxy;
