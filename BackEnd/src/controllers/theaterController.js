const HttpError = require("../common/HttpError");
const Theater = require("../models/theaterSchema");

const addTheater = async (req, res, next) => {
  try {
    const newTheater = new Theater(req.body);
    const savedTheater = await newTheater.save();
    res.status(200).json({
      data: savedTheater,
      success: true,
      message: "Theater has been added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllTheaters = async (req, res, next) => {
  try {
    const allTheaters = await Theater.find().populate("owner");
    res.status(200).json({
      data: allTheaters,
      success: true,
      message: "All Theaters has been fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllTheatersByOwner = async (req, res, next) => {
  try {
    const allTheatersByOwner = await Theater.find({ owner: req?.body?.userId });
    res.status(200).json({
      data: allTheatersByOwner,
      success: true,
      message: "All Theaters has been fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const updateTheater = async (req, res, next) => {
  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      req.body.theaterId,
      req.body,
      { new: true }
    );
    if (!updateTheater) {
      throw new HttpError(404, "Theater not found");
    }
    res.status(200).json({
      data: updatedTheater,
      success: true,
      message: "Theater has been updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTheater = async (req, res, next) => {
  try {
    const deletedTheater = await Theater.findByIdAndDelete(
      req?.params?.theaterId
    );
    if (!deletedTheater) {
      throw new HttpError(404, "Theater not found");
    }
    res.status(200).json({
      data: deletedTheater,
      success: true,
      message: "Theater has been deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTheater,
  getAllTheaters,
  getAllTheatersByOwner,
  updateTheater,
  deleteTheater,
};
