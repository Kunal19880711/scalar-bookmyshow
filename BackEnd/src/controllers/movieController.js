const HttpError = require("../common/HttpError");
const Movie = require("../models/movieSchema");

const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req?.body);
    await movie.save();
    // TODO: check if movie already exists
    res.status(200).json({
      message: "New Movie has been added successfully.",
      success: true,
    });
  } catch (error) {
    throw error;
  }
};
const getAllTheMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.status(200).json({
      data: allMovies,
      success: true,
      message: "All Movies has been fetched successfully.",
    });
  } catch (error) {
    throw error;
  }
};
const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req?.body?.movieId,
      req?.body,
      { new: true }
    );
    if(!updatedMovie) {
      throw new HttpError(404, "Movie not found");
    }
    res.status(200).json({
      data: updatedMovie,
      success: true,
      message: "The Movie has been updated successfully.",
    });
  } catch (error) {
    throw error;
  }
};
const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req?.params?.movieId);
    if(!deletedMovie) {
      throw new HttpError(404, "Movie not found");
    }
    res.status(200).json({
      data: deletedMovie,
      success: true,
      message: "The Movie has been deleted successfully.",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addMovie,
  getAllTheMovies,
  updateMovie,
  deleteMovie,
};
