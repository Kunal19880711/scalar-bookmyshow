const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

/**
 * @openapi
 * /movies/addMovie:
 *   post:
 *     tags:
 *       - Movie
 *     summary: Add a new movie
 *     description: Add a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieName:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               genre:
 *                 type: string
 *               language:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *               poster:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie added successfully
 *       400:
 *         description: Bad request
 */
router.post("/addMovie", movieController.addMovie);

/**
 * @openapi
 * /movies/getAllMovies:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Get all the movies
 *     description: Get all the movies
 *     responses:
 *       200:
 *         description: All movies fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/getAllMovies", movieController.getAllTheMovies);

/**
 * @openapi
 * /movies/getMovieById/{movieId}:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Get a movie by id
 *     description: Get a movie by id
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: The id of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/getMovieById/:movieId", movieController.getMovieById);

/**
 * @openapi
 * /movies/updateMovie:
 *   patch:
 *     tags:
 *       - Movie
 *     summary: Update a movie
 *     description: Update a movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               movieName:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               genre:
 *                 type: string
 *               language:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *               poster:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Bad request
 */
router.patch("/updateMovie", movieController.updateMovie);

/**
 * @openapi
 * /movies/deleteMovie/{movieId}:
 *   delete:
 *     tags:
 *       - Movie
 *     summary: Delete a movie
 *     description: Delete a movie
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: The id of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete("/deleteMovie/:movieId", movieController.deleteMovie);

module.exports = router;
