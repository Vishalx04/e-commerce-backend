const {  UnauthorizedError } = require("../errors");
const extractToken = require("../utils/extractToken");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    throw new UnauthorizedError("Authentication token is required");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = decoded;

  next();
};

module.exports = authMiddleware;
