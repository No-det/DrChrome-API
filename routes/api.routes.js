const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller");

router.post("/updateUser", apiController.updateUser);
router.get("/getUser/:id", apiController.getUser);
router.post("/appointment/:id", apiController.addAppointment);
router.post("/updateApp/:id", apiController.updateAppointment);
router.post("/isDoctor/:id", apiController.isDoctor);
router.get("/getDoctors", apiController.getDoctors);

module.exports = router;
