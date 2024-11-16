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

const getAllTheatersByMovie = async (req, res, next) => {
  try {
    const shows = await Show.find({
      movie: req?.body?.movieId,
      date: req?.body?.date,
    }).populate("theater");
    res.status(200).json({
      data: marshalShowByMovie(shows),
      success: true,
      message: "Shows fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

function marshalShowByMovie(shows) {
  const theaterIdMap = new Map();
  for (let show of shows) {
    const { theater } = show;
    show.theater = theater._id;
    if (!theaterIdMap.has(theater._id)) {
      theaterIdMap.set(theater._id, { ...theater._doc, shows: [show] });
    } else {
      theaterIdMap.get(theater._id).shows.push(show);
    }
  }
  return [...theaterIdMap.values()];
}

const getShowById = async (req, res, next) => {
  try {
    const show = await Show.findById(req?.body?.showId)
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
  getAllTheatersByMovie,
  getShowById,
};
