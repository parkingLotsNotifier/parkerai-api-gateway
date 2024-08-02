const jwt = require("jsonwebtoken");
const { AUTH_SERVICE_JWT_SECRET } = require("../../config/env");
const logger = require("../logger/logger");

const authenticateToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  if (!token) {
    logger.warn("Unauthorized access attempt");
    return res.status(401).json({ message: "Unauthorized" });
  }

  //decoded payload if the signature is valid and optional expiration, audience, or issuer are valid.
  //If not, it will be called with the error.
  jwt.verify(token, AUTH_SERVICE_JWT_SECRET, (err, user) => {
    if (err) {
      logger.error("Token verification failed", err);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
