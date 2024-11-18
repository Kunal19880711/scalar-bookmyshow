const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Booking ID
 *           example: 671a8c95aa2bdf5ee7c9e8c5
 *         show:
 *           $ref: '#/components/schemas/Show'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         seats:
 *           type: array
 *           description: Array of seat numbers
 *           items:
 *             type: number
 *           example: [121, 122]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Booking creation date
 *           example: 2024-10-24T18:06:13.075Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Booking last update date
 *           example: 2024-10-24T18:06:13.075Z
 *       example:
 *         _id: 671a8c95aa2bdf5ee7c9e8c5
 *         show: 671a8c95aa2bdf5ee7c9e8c4
 *         user: 671a8c95aa2bdf5ee7c9e8c6
 *         seats: [121, 122]
 *         createdAt: 2024-10-24T18:06:13.075Z
 *         updatedAt: 2024-10-24T18:06:13.075Z
 * tags:
 *   - name: Booking
 *     description: Booking a Show
 */
const bookingSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shows",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    seats: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
