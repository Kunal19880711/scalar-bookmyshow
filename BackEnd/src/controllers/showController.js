const HttpError = require("../common/HttpError");
const Show = require("../models/showSchema");

const addShow = async (req, res, next) => {
  try {
    const show = new Show(req?.body);
    await show.save();
    res.status(200).json({
      message: "Show added successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllShowsByTheater = async (req, res, next) => {
  try {
    const shows = await Show.find({ theater: req?.body?.theaterId }).populate(
      "movie"
    );
    res.status(200).json({
      data: shows,
      success: true,
      message: "Shows fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllShowsByMovie = async (req, res, next) => {
  try {
    const shows = await Show.find({
      movieId: req?.body?.movieId,
      date: req?.body?.date,
    }).populate("theater");
    res.status(200).json({
      data: shows,
      success: true,
      message: "Shows fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getShowsById = async (req, res, next) => {
  try {
    const show = await Show.findById(req?.body?.id)
      .populate("movie")
      .populate("theater");
    if (!show) {
      throw new HttpError(404, "Show not found.");
    }
    res.status(200).json({
      data: show,
      success: true,
      message: "Show fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const updateShow = async (req, res, next) => {
  try {
    const show = await Show.findByIdAndUpdate(req?.body?.showId, req?.body, {
      new: true,
      runValidators: true,
    });
    if (!show) {
      throw new HttpError(404, "Show not found.");
    }
    res.status(200).json({
      data: show,
      success: true,
      message: "Show updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteShow = async (req, res, next) => {
  try {
    const show = await Show.findByIdAndDelete(req?.params?.showId);
    if (!show) {
      throw new HttpError(404, "Show not found.");
    }
    res.status(200).json({
      data: show,
      success: true,
      message: "Show deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addShow,
  updateShow,
  deleteShow,
  getAllShowsByTheater,
  getAllShowsByMovie,
  getShowsById,
};
