const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionString = process.env.MONGODB_URL;
  // const connectionString =
  //   "mongodb+srv://kunal21634267atlasmongo:sFkcBePYlAqUfZyE@cluster0.xrmze.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;