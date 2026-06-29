const { getStates, getCities } = require("../controllers/location.controller");

const router = require("express").Router();

router.get("/states",getStates);
router.get("/states/:stateId",getCities);

module.exports = router;

