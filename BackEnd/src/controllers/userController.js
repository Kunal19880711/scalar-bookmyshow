const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // TODO: proper handling of scenario if email not provided
    const userExists = await User.findOne({ email: req?.body?.email });

    if (userExists) {
      return (
        res
          // TODO: add proper http status
          .status(200)
          .json({ message: "User already exists", success: true })
      );
    }

    const salt = await bcrypt.genSalt(10); // 2^10 of rounds
    const hashedPassword = await bcrypt.hash(req?.body?.password, salt);
    req.body.password = hashedPassword;
    const user = await new User(req?.body);
    await user.save();
    res.status(200).json({
      message: "Registration successful, Please login.",
      success: true,
    });
  } catch (error) {
    // TODO: middleware error handling
    // res.status(500).json({ message: error.message });
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    // TODO: proper handling of scenario if email not provided
    const userExists = await User.findOne({ email: req?.body?.email });

    if (!userExists) {
      return (
        res
          // TODO: add proper http status
          .status(200)
          .json({
            message: "User doesn't exists. Please register.",
            success: true,
          })
      );
    }

    const validatePassword = await bcrypt.compare(
      req?.body?.password,
      userExists.password
    );
    if (!validatePassword) {
      return (
        res
          // TODO: add proper http status
          .status(200)
          .json({ message: "Please enter valid password.", success: false })
      );
    }
    // TODO: creation of session with proper session data
    const token = jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    // TODO: add proper http status
    const response = {
      message: "You have successfully logged in.",
      success: true,
    }
    if(process.env.SESSION_COOKIE_NAME) {
      res.cookie(process.env.SESSION_COOKIE_NAME, token, {
        maxAge: process.env.SESSION_COOKIE_MAX_AGE || 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
    } else {
      response.data = token
    }
    return res.status(200).json(response);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    throw error;
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req?.body?.user.userId).select("-password");
    res
      .status(200)
      .json({
        data: user,
        success: true,
        message: "User details fetched successfully.",
      });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    throw error;
  }
};

module.exports = { registerUser, loginUser, currentUser };

// TODO: middleware to check Authentication of user
// TODO: middleware to check Authorization of user
