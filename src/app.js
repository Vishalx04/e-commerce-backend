const express = require("express");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminProductRoutes = require("./routes/adminRoutes/adminProductRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/admin/product",adminProductRoutes);



app.use("/test",authMiddleware,adminMiddleware,(req,res)=>{
    return res.json(req.user);
})
module.exports = app;