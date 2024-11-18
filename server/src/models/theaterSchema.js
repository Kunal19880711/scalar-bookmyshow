const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Theater:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Theater ID
 *           example: 671a8c95aa2bdf5ee7c9e8c5
 *         name:
 *           type: string
 *           description: Theater name
 *           example: Cinemex
 *         address:
 *           type: string
 *           description: Theater address
 *           example: Av. Universidad 123, Cuauht moc, 04500 Ciudad de M xico, CDMX
 *         phone:
 *           type: string
 *           description: Theater phone number
 *           example: 55 1234 5678
 *         email:
 *           type: string
 *           description: Theater email
 *           example: cinemex@example.com
 *         owner:
 *           type: string
 *           description: Theater owner
 *           example: 671a8c95aa2bdf5ee7c9e8c6
 *         isActive:
 *           type: boolean
 *           description: Theater status
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Theater creation date
 *           example: 2024-10-24T18:06:13.075Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Theater last update date
 *           example: 2024-10-24T18:06:13.075Z
 * tags:
 *   - name: Theater
 *     description: Theater information
 */
const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Theater = mongoose.model("theaters", theaterSchema);
module.exports = Theater;
