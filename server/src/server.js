require("dotenv").config({ path: "../.env" });
console.log(process.env);
const path = require("path");
const express = require("express");
const cors = require("cors");
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

connectDB();

const clientDistPath = path.join(__dirname, "..", "..", "client", "dist");
const app = express();
const apiLimiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'self'", "*.stripe.com"],
      scriptSrc: ["'self'", "*.stripe.com"], // Allow scripts from 'self'
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
      imgSrc: ["'self'", "data:", "*"], // Allow images from 'self' and data URLs,
      connectSrc: ["'self'", "*.stripe.com"], // Allow connections to 'self'
      fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
      objectSrc: ["'none'"], // Disallow object, embed, and applet elements
      upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
  })
);
// app.use(cors()); // TODO: furthur exploration
app.use(express.json());
app.use(mongoSanitize());
app.use("/bms", apiLimiter);

// Serve static files with custom Cache-Control headers
app.use((req, res, next) => {
  if (req.url.startsWith("/bms")) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // No caching for /bms URLs
  } else if (req.url.match(/\.(css|js|png|jpg|jpeg|gif)$/)) {
    res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year
  } else if (req.url === "/index.html") {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // No caching for index.html
  }
  next();
});

app.use("/", express.static(clientDistPath));
if (process.env.SESSION_COOKIE_NAME) {
  app.use(cookieParser());
}
app.use("/bms/users", userRoute);
app.use("/bms/movies", validateJWTToken, movieRoute);
app.use("/bms/theaters", validateJWTToken, theaterRoute);
app.use("/bms/shows", validateJWTToken, showRoute);
app.use("/bms/bookings", validateJWTToken, bookingRoute);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.use(handleParsingError);
app.use(handleMongooseError);
app.use(handleError);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
