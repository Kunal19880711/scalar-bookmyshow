const mongoose = require("mongoose");

/**
 * User schema
 *
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *           example: 671a8c95aa2bdf5ee7c9e8c5
 *         name:
 *           type: string
 *           description: User name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User email
 *           example: john.doe@example.com
 *         role:
 *           type: string
 *           description: User role
 *           enum:
 *             - user
 *             - admin
 *             - partner
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation date
 *           example: 2024-10-24T18:06:13.075Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update date
 *           example: 2024-10-24T18:06:13.075Z
 * tags:
 *   - name: User
 *     description: User Details
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "partner"],
      required: true,
      default: "user",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
