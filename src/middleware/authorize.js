const { ForbiddenError } = require("../errors");

const authorize = (...roles) =>{
   
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new ForbiddenError("Access Denied");
        }

        next();
    }
    
    
}


module.exports = authorize;