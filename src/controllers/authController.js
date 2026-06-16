const {registerUser} = require("../services/authService")

const register = async (req,res)=>{
    
    const result = await registerUser(req.body);

    
    res.json({
        result,
        message : "register route working properly"
    })
}

module.exports = {
    register
}