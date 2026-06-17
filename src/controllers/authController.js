const {registerUser, userlogin} = require("../services/authService")

const register = async (req,res)=>{
    
    const result = await registerUser(req.body);

    
    res.json({
        result,
        message : "register route working properly"
    })
}

const login = async (req,res) =>{
    const data = await userlogin(req.body);

    res.json({
        message: "User logged in successfully",
        data
    })
}

module.exports = {
    register,
    login
}