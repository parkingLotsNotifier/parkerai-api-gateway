const proxy = require("express-http-proxy");
const {
  SCHEDULER_SERVICE_BASE_ADDRS, // Base address where SchedulerService is hosted
  SCHEDULER_SERVICE_SERVICE_PORT, // Port on which SchedulerService is running
} = require("../../config/env");

const SCHEDULER_SERVICE_URL = `${SCHEDULER_SERVICE_BASE_ADDRS}:${SCHEDULER_SERVICE_SERVICE_PORT}`;
const schedulerServiceProxy = proxy(SCHEDULER_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/scheduler${req.url}`, // Forwarding to the SchedulerService endpoint
});

module.exports = schedulerServiceProxy;
