const httpStatusMessage = require("../common/httpStatusMessage");

module.exports = function handleError(error, req, res, next) {
    if (error instanceof HttpError) {
        res.status(error.status).json({ success: false, message: error.message, data: error.data });
    } else {
        console.error(httpStatusMessage[500], error);
        res.status(500).json({ success: false, message: httpStatusMessage[500] });
    }
}