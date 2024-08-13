const proxy = require("express-http-proxy");
const {
  DATA_MANAGEMENT_SERVICE_BASE_ADDRS,
  DATA_MANAGEMENT_SERVICE_PORT,
} = require("../../config/env");

const DATA_MANAGEMENT_SERVICE_URL = `${DATA_MANAGEMENT_SERVICE_BASE_ADDRS}:${DATA_MANAGEMENT_SERVICE_PORT}`;
const dataManagementServiceProxy = proxy(DATA_MANAGEMENT_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/data-managment${req.url}`,
});

module.exports = dataManagementServiceProxy;
