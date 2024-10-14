const express = require("express");
const validateJWTToken = require("../middleware/validateJWTToken");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.post("/addMovie", validateJWTToken, movieController.addMovie);
router.get("/getAllMovies", validateJWTToken, movieController.getAllTheMovies);
router.patch("/updateMovie", validateJWTToken, movieController.updateMovie);
router.delete("/deleteMovie/:movieId", validateJWTToken, movieController.deleteMovie);

module.exports = router;
