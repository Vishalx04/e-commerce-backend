const express = require("express");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminProductRoutes = require("./routes/adminRoutes/adminProductRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/error.middleware");
const authorize = require("./middleware/authorize");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/admin/product",adminProductRoutes);



app.use("/test",authMiddleware,authorize("ADMIN"),(req,res)=>{
    return res.json(req.user);
});


app.use(errorHandler);
module.exports = app;