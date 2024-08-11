const dotenv = require("dotenv");
dotenv.config({path:'.env'});
const env = {

            DB_USERNAME : process.env.DB_USERNAME,
            DB_PASSWORD : process.env.DB_PASSWORD,
            DB_HOST : process.env.DB_HOST,
            PORT : process.env.PORT,
            GREETING:'hello',
            FAREWELL:'goodbye',
            TELEGRAM_TOKEN : process.env.TELEGRAM_TOKEN,
            GMAIL_PASS : process.env.GMAIL_PASS,
            GMAIL_USERNAME : process.env.GMAIL_USERNAME,
            MAIL_DEST : process.env.MAIL_DEST,
            MAIL_SOURCE : process.env.MAIL_SOURCE,
            CHAT_ID : process.env.CHAT_ID,
            ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
            NODE_ENV: process.env.NODE_ENV,

            // auth-service props
            AUTH_SERVICE_PORT : process.env.AUTH_PORT,
            AUTH_SERVICE_JWT_SECRET : process.env.AUTH_SERVICE_JWT_SECRET,
            AUTH_SERVICE_BASE_ADDRS : process.env.AUTH_SERVICE_BASE_ADDRS,

            // image-processing-service props
            IMAGE_SERVICE_BASE_ADDRS: process.env.IMAGE_SERVICE_BASE_ADDRS,
            IMAGE_SERVICE_PORT: process.env.IMAGE_SERVICE_PORT,

            // user-managment-service props
            USER_MANAGMENT_SERVICE_BASE_ADDRS : process.env.USER_MANAGMENT_SERVICE_BASE_ADDRS,
            USER_MANAGMENT_SERVICE_PORT : process.env.USER_MANAGMENT_SERVICE_PORT

            };

module.exports=env;
