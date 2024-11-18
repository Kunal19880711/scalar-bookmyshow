require("dotenv").config({ path: "../.envConfig" });
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theaterRoute = require("./routes/theaterRoute");
const showRoute = require("./routes/showRoute");
const bookingRoute = require("./routes/bookingRoute");
const {
  handleParsingError,
  handleMongooseError,
  handleError,
} = require("./middleware/handleError");
const validateJWTToken = require("./middleware/validateJWTToken");
const cacheControl = require("./middleware/cacheControl");
const helmetContentSecurity = require("./controllers/helmetContentSecurity");
const { swaggerUi, swaggerSpec } = require("./controllers/swaggerController");

connectDB();

const clientDistPath = path.join(__dirname, "..", "..", "client", "dist");
const app = express();
const apiLimiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(helmet());
app.use(helmetContentSecurity);
app.use(express.json());
app.use(mongoSanitize());
app.use("/bms", apiLimiter);

// Serve static files with custom Cache-Control headers
app.use(cacheControl);
app.use(cookieParser());

app.use("/", express.static(clientDistPath));
app.use("/bms/users", userRoute);
app.use("/bms/movies", validateJWTToken, movieRoute);
app.use("/bms/theaters", validateJWTToken, theaterRoute);
app.use("/bms/shows", validateJWTToken, showRoute);
app.use("/bms/bookings", validateJWTToken, bookingRoute);

// adding swagger docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.use(handleParsingError);
app.use(handleMongooseError);
app.use(handleError);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
