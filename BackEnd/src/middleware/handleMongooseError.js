const mongoose = require("mongoose");
const HttpError = require("../common/HttpError");

module.exports = function handleMongooseError(error, req, res, next) {
  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError
  ) {
    const data = Object.keys(error.errors).map((key) => ({
      keyPath: key,
      value: error.errors[key].message,
    }));
    return next(new HttpError(400, "Validation Error", data));
  }

  if (error instanceof mongoose.MongooseError) {
    console.error("Unknown mongoose error, need additional handling", error);
    return next(new HttpError(500));
  }

  next(error);
};
