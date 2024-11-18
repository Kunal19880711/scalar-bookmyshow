const mongoose = require("mongoose");

/**
 * Movie schema
 *
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Movie ID
 *           example: 671a8c95aa2bdf5ee7c9e8c5
 *         movieName:
 *           type: string
 *           description: Movie name
 *           example: Inception
 *         description:
 *           type: string
 *           description: Movie description
 *           example: A mind-bending thriller
 *         duration:
 *           type: number
 *           description: Movie duration in minutes
 *           example: 148
 *         genre:
 *           type: string
 *           description: Genre of the movie
 *           example: Sci-Fi
 *         language:
 *           type: string
 *           description: Language of the movie
 *           example: English
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Release date of the movie
 *           example: 2010-07-16
 *         poster:
 *           type: string
 *           description: URL of the movie poster
 *           example: http://example.com/poster.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Movie creation date
 *           example: 2024-10-24T18:06:13.075Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Movie last update date
 *           example: 2024-10-24T18:06:13.075Z
 */
const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: { // in minutes
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    language: {
        // convert into array for mutlilingual movies
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("movies", movieSchema);
