const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       tag: Show
 *       properties:
 *         _id:
 *           type: string
 *           description: Show ID
 *           example: 671a8c95aa2bdf5ee7c9e8c5
 *         name:
 *           type: string
 *           description: Show name
 *           example: Evening Show
 *         date:
 *           type: string
 *           format: date
 *           description: Show date
 *           example: 2024-10-24
 *         time:
 *           type: string
 *           description: Show time
 *           example: 18:00
 *         movie:
 *           $ref: '#/components/schemas/Movie'
 *         theater:
 *           $ref: '#/components/schemas/Theater'
 *         ticketPrice:
 *           type: number
 *           description: Ticket price
 *           example: 300
 *         totalSeats:
 *           type: number
 *           description: Total seats available
 *           example: 100
 *         bookedSeats:
 *           type: array
 *           items:
 *             type: number
 *           description: List of booked seat numbers
 *           example: [101, 102, 103]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Show creation date
 *           example: 2024-10-24T18:06:13.075Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Show last update date
 *           example: 2024-10-24T18:06:13.075Z
 * tags:
 *   - name: Show
 *     description: Show Details
 */
const showSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theaters",
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shows", showSchema);
