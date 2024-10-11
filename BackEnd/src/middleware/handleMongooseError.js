const HttpError = require("../common/HttpError");

module.exports = function handleMongooseError(error, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    const data = Object.keys(err.errors).map((key) => ({
      keyPath: key,
      value: err.errors[key].message,
    }));
    return next(new HttpError(400, "Validation Error", data));
  }

  next(error);
};
