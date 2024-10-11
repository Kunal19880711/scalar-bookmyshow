const httpStatusMessages = require("./httpStatusMessage");

class HttpError extends Error {
    constructor(status = null, message = null, data = null) {
        status = httpStatusMessages[status] ? status : 500;
        message = message || httpStatusMessages[status];
        super(message);
        this.status = status;
        this.data = data;
    }
}

module.exports = HttpError