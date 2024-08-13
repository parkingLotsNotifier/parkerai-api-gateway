// src/apiGateway.js
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authServiceProxy = require("./src/proxy/authServiceProxy");
const errorHandler = require("./src/middlewares/errorLogMiddleware");
const logger = require("./src/logger/logger");
const rateLimiter = require("./src/middlewares/rateLimiter");
const authenticateToken = require("./src/middlewares/authMiddleware");
const { PORT } = require("./config/env");
const imageProcessingServiceProxy = require("./src/proxy/imageProcessingServiceProxy");
const dataManagementServiceProxy = require("./src/proxy/dataManagmentServiceProxy");
const predictionServiceProxy = require("./src/proxy/predictionServiceProxy");
const {ppWorkflowHandler} = require("./src/handlers/ppWorkflowHandler");
const ppsWorkflowHandler = require("./src/handlers/ppsWorkflowHandler");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(rateLimiter);

// Use authProxy for authentication routes
app.use("/auth", authServiceProxy);

// Use authentication middleware
app.use("/image-processing", authenticateToken, imageProcessingServiceProxy);
app.use("/data-management", authenticateToken, dataManagementServiceProxy);
app.use("/predictions", authenticateToken, predictionServiceProxy);

//  pp-workflow endpoint
app.post("/pp-workflow", authenticateToken, ppWorkflowHandler);
app.post("/pps-workflow",authenticateToken, ppsWorkflowHandler)

// Use custom error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT,'0.0.0.0', () => {
  logger.info(`API Gateway running on port ${PORT}`);
});
