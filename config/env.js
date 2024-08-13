const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const env = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT,
  GREETING: "hello",
  FAREWELL: "goodbye",
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  MAIL_DEST: process.env.MAIL_DEST,
  MAIL_SOURCE: process.env.MAIL_SOURCE,
  CHAT_ID: process.env.CHAT_ID,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,

  // auth-service props
  AUTH_SERVICE_SERVICE_PORT: process.env.AUTH_SERVICE_SERVICE_PORT,
  AUTH_SERVICE_JWT_SECRET: process.env.AUTH_SERVICE_JWT_SECRET,
  AUTH_SERVICE_BASE_ADDRS: process.env.AUTH_SERVICE_BASE_ADDRS,

  // image-processing-service props
  IMAGE_PROCESSING_SERVICE_BASE_ADDRS: process.env.IMAGE_PROCESSING_SERVICE_BASE_ADDRS,
  IMAGE_PROCESSING_SERVICE_SERVICE_PORT: process.env.IMAGE_PROCESSING_SERVICE_SERVICE_PORT,

  // data-managment-service props
  DATA_MANAGEMENT_SERVICE_BASE_ADDRS:
    process.env.DATA_MANAGEMENT_SERVICE_BASE_ADDRS,
  DATA_MANAGEMENT_SERVICE_PORT: process.env.DATA_MANAGMENT_SERVICE_PORT,

  // prediction service
  PREDICTION_SERVICE_BASE_ADDRS: process.env.PREDICTION_SERVICE_BASE_ADDRS,
  PREDICT_SERVICE_SERVICE_PORT_INFERENCE: process.env.PREDICT_SERVICE_SERVICE_PORT_INFERENCE,
};

module.exports = env;
