const mongoose 
const HttpError = require("../common/HttpError");

module.exports = function handleMongooseError(error, req, res, next) {
  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError
  ) {
    const data = Object.keys(err.errors).map((key) => ({
      keyPath: key,
      value: err.errors[key].message,
    }));
    return next(new HttpError(400, "Validation Error", data));
  }

  if (error instanceof mongoose.Error.MongooseError) {
    console.error(error);
    return next(new HttpError(500));
  }
  
  next(error);
};
