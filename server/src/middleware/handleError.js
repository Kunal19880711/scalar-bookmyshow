const mongoose = require("mongoose");
const HttpError = require("../common/HttpError");
const httpStatusMessage = require("../common/httpStatusMessage");

function handleParsingError(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Handle the JSON parsing error here
    return next(
      new HttpError(400, "Invalid JSON payload", { message: err.message })
    );
  }
  next(err);
}

function handleMongooseError(err, req, res, next) {
  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError
  ) {
    const data = Object.keys(err.errors).map((key) => ({
      keyPath: key,
      value: err.errors[key].message,
    }));
    return next(new HttpError(400, "Validation Error", data));
  }

  if (err instanceof mongoose.MongooseError) {
    console.error("Unknown mongoose error, need additional handling", err);
    return next(new HttpError(500));
  }

  next(err);
}

function handleError(err, req, res, next) {
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message, data: err.data });
  }
  console.error(httpStatusMessage[500], err);
  res.status(500).json({ success: false, message: httpStatusMessage[500] });
}

module.exports = {
  handleParsingError,
  handleMongooseError,
  handleError,
};
