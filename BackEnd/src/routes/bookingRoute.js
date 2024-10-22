const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/makePaymentAndBookShow", bookingController.makePaymentAndBookShow);
router.get("/getAllBookings", bookingController.getAllBookings);

module.exports = router;
