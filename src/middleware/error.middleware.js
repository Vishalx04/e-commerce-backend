const errorHandler = (err,req,res,next)=>{
    console.log(err);

    return res.status(err.statusCode || 500).json({
        success : false,
        message : err.message || "Internal server error"
    })
}

module.exports = errorHandler;



//////////next thing is to remove all the useless try catch and then test the error classes and then make the services and controller and middleware names consistent