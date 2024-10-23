const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const HttpError = require("../common/HttpError");
const {
  default: emailHelper,
  EMailTemplates,
} = require("../utils/emailHelper");

const registerUser = async (req, res, next) => {
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
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // TODO: proper handling of scenario if email not provided
    const userExists = await User.findOne({ email: req?.body?.email });

    if (!userExists) {
      throw new HttpError(400, "User doesn't exists. Please register.");
    }

    const validatePassword = await bcrypt.compare(
      req?.body?.password,
      userExists.password
    );
    if (!validatePassword) {
      throw new HttpError(400, "Please enter valid password.");
    }
    // TODO: creation of session with proper session data
    const token = jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    // TODO: add proper http status
    const response = {
      message: "You have successfully logged in.",
      success: true,
    };
    if (process.env.SESSION_COOKIE_NAME) {
      res.cookie(process.env.SESSION_COOKIE_NAME, token, {
        maxAge: process.env.SESSION_COOKIE_MAX_AGE || 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } else {
      response.data = token;
    }
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.body?.user.userId).select(
      "-password"
    );
    res.status(200).json({
      data: user,
      success: true,
      message: "User details fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new HttpError(400, "Please enter EMail for forgot password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(404, "User not found.");
    }
    const otp = generateOtp(6);
    await User.findByIdAndUpdate(user._id, {
      otp,
      otpExpiry: Date.now() + 15 * 60 * 1000, // 15 mins
    });

    await emailHelper(EMailTemplates.Otp, user.email, {
      name: user.name,
      otp,
    });

    res.status(200).json({
      message: "OTP sent to your registered email.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { otp, password } = req.body;
    if (!otp || !password) {
      throw new HttpError(400, "All fields are required.");
    }
    const user = await User.findOne({
      otp,
    });
    if (!user) {
      throw new HttpError(400, "Invalid OTP.");
    }

    if (user.otpExpiry < Date.now()) {
      throw new HttpError(400, "Expired OTP. Regenerate new Otp.");
    }

    if (user.otp !== otp) {
      throw new HttpError(400, "Invalid OTP.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      $unset: {
        otp: "",
        otpExpiry: "",
      },
    });
    res.status(200).json({
      message: "Password reset successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

function generateOtp(length) {
  return Array.from({ length }, () => Math.floor(10 * Math.random())).join("");
}

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  forgotPassword,
  resetPassword,
};

// TODO: middleware to check Authorization of user
