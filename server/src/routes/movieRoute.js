const express = require("express");
const validateJWTToken = require("../middleware/validateJWTToken");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.post("/addMovie", movieController.addMovie);
router.get("/getAllMovies", movieController.getAllTheMovies);
router.get("/getMovieById/:movieId", movieController.getMovieById);
router.patch("/updateMovie", movieController.updateMovie);
router.delete("/deleteMovie/:movieId", movieController.deleteMovie);

module.exports = router;
