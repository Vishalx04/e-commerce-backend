const { getCategories } = require("../controllers/category.controller");

const router = require("express").Router();

router.get("/",getCategories);


module.exports = router;