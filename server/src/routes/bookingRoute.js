const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

/**
 * @openapi
 * /booking/makePaymentAndBookShow:
 *   post:
 *     tags:
 *       - Booking
 *     summary: Make payment and book a show
 *     description: Make payment and book a show
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               show:
 *                 type: string
 *               seats:
 *                 type: array
 *                 items:
 *                   type: string
 *               token:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Show booked successfully
 *       400:
 *         description: Bad request
 */
router.post("/makePaymentAndBookShow", bookingController.makePaymentAndBookShow);

/**
 * @openapi
 * /booking/getAllBookings:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get all bookings
 *     description: Get all bookings
 *     responses:
 *       200:
 *         description: Bookings fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/getAllBookings", bookingController.getAllBookings);

module.exports = router;
