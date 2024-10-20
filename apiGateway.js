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
const schedulerServiceProxy = require("./src/proxy/schedulerServiceProxy"); // Import the Scheduler Service Proxy
const pPWorkflowHandler = require("./src/controllers/pPWorkflowHandler");
const pPSWorkflowHandler = require("./src/controllers/pPSWorkflowHandler");
const dCCWorkflowHandler = require("./src/controllers/dCCWorkflowHandler");
const { startConsumer } = require("./src/consumer/rabbimqConsumer");
const cors = require("cors");


const app = express();
// CORS configuration
app.use(cors({
  origin: 'http://localhost:3002', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow standard HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  credentials: true, // Allow credentials like cookies
  exposedHeaders: ['Authorization'], // Expose additional headers if needed
  maxAge: 600 // Cache the preflight request for 10 minutes
}));
app.options('*', cors());
app.use(cookieParser());
app.use(rateLimiter);

// TODO 
app.use("/data-management", dataManagementServiceProxy);

app.use(bodyParser.json({ limit: "10mb" }));

// Use authProxy for authentication routes
app.use("/auth", authServiceProxy);

// // Use authentication middleware
// app.use(authenticateToken);



app.use("/image-processing", imageProcessingServiceProxy);
app.use("/predictions", predictionServiceProxy);

//  pp-workflow endpoint
app.post("/pp-workflow", pPWorkflowHandler);
app.post("/pps-workflow", pPSWorkflowHandler);
app.post("/dcc-workflow", dCCWorkflowHandler);

app.use("/scheduler", schedulerServiceProxy); // Use schedulerServiceProxy for scheduling routes


// Use custom error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`API Gateway running on port ${PORT}`);
  startConsumer();  // Start the consumer after the server
});
