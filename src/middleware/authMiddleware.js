const extractToken = require("../utils/extractToken");
const jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next) =>{
    try {
    const token = extractToken(req);
    
    if(!token){
        return res.status(401).json({
            success: false,
            message : "Token Missing"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();

    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Invalid token"
        })
    }
}  

module.exports = authMiddleware;