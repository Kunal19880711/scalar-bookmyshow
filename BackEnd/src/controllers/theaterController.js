const Theater = require("../models/theaterSchema");

const addTheater = async (req, res) => {
  try {
    const newTheater = new Theater(req.body);
    const savedTheater = await newTheater.save();
    res.status(200).json({
      data: savedTheater,
      success: true,
      message: "Theater has been added successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTheaters = async (req, res) => {
  try {
    const allTheaters = await Theater.find().populate("owner");
    res.status(200).json({
      data: allTheaters,
      success: true,
      message: "All Theaters has been fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTheatersByOwner = async (req, res) => {
  try {
    const allTheatersByOwner = await Theater.find({ owner: req.body.userId });
    res.status(200).json({
      data: allTheatersByOwner,
      success: true,
      message: "All Theaters has been fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTheater = async (req, res) => {
  try {
    const singleTheater = await Theater.findById(req.params.theaterId);
    if (!singleTheater)
      return res.status(404).json({ message: "Theater not found." });
    res.status(200).json({
      data: singleTheater,
      success: true,
      message: "Theater has been fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTheater = async (req, res) => {
  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.theaterId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      data: updatedTheater,
      success: true,
      message: "Theater has been updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTheater = async (req, res) => {
  try {
    const deletedTheater = await Theater.findByIdAndRemove(
      req.params.theaterId
    );
    if (!deletedTheater)
      return res.status(404).json({ message: "Theater not found." });
    res.status(200).json({
      data: deletedTheater,
      success: true,
      message: "Theater has been deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTheater,
  getAllTheaters,
  getAllTheatersByOwner,
  getTheater,
  updateTheater,
  deleteTheater,
};
