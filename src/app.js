const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/category.routes");
const adminProductRoutes = require("./routes/adminRoutes/adminProductRoutes");
const adminCategoryRoutes = require("./routes/adminRoutes/admin.category.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const cartRoutes = require("./routes/cart.routes");
const locationRoutes = require("./routes/location.routes");
const addressRoutes = require("./routes/address.routes");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/error.middleware");
const authorize = require("./middleware/authorize");
const app = express();

app.use(express.json());

//general
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

//authenticated
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

//admin
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/admin/category", adminCategoryRoutes);

//others
app.use("/api/locations", locationRoutes);

app.use("/test", authMiddleware, authorize("ADMIN"), (req, res) => {
  return res.json(req.user);
});

//middlewares
app.use(errorHandler);
module.exports = app;
