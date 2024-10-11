const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const handleMongooseError = require("./middleware/handleMongooseError");
const handleError = require("./middleware/handleError");

const app = express();
require("dotenv").config();
connectDB();

app.use(cors()); // TODO: furthur exploration
app.use(express.json());
if(process.env.SESSION_COOKIE_NAME) {
    app.use(cookieParser());
}
app.use('/bms/users', userRoute);

app.use(handleMongooseError);
app.use(handleError);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

