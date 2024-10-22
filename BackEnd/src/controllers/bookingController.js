const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Booking = require("../models/bookingSchema");
const Show = require("../models/showSchema");
const HttpError = require("../common/HttpError");

const addNewBooking = async (booking) => {
  const newBooking = new Booking(booking);
  try {
    return await newBooking.save();
  } catch (error) {
    throw error;
  }
};

const updateBooking = async (bookingId, bookingUpdates) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      bookingUpdates,
      { new: true }
    );
    if (!updatedBooking) {
      throw new HttpError(404, "Booking not found");
    }
    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

const updateShowBookedSeats = async (showId, seats) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      { $push: { bookedSeats: { $each: seats } } },
      { new: true }
    );
    if (!updatedShow) {
      throw new HttpError(404, "Show not found");
    }
    return updatedShow;
  } catch (error) {
    throw error;
  }
};

const makePayment = async ({ token, amount }) => {
  try {
    const customers = await stripe.customers.list({
      email: token.email,
      limit: 1,
    });
    const currCustomer =
      customers.data.length > 0
        ? customers.data[0]
        : await stripe.customers.create({
            source: token.id,
            email: token.email,
          });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: currCustomer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie",
    });
    return paymentIntent.id;
  } catch (error) {
    throw error;
  }
};

const makePaymentAndBookShow = async (req, res, next) => {
  try {
    console.log(req.body);
    const newBooking = await addNewBooking({
      ...req.body,
      user: req.body.user.userId,
      transactionId: "__NO_TRANSACTION_YET__",
    });
    const { token, amount, show, seats } = req.body;

    let transactionId = "__DUMMY_TRANSACTION__";
    if(!(process.env.MODE === "DEVELOPMENT") || !req.body.skipStripe) {
      transactionId = await makePayment({ token, amount });
    }

    await updateShowBookedSeats(show, seats);
    const updatedBooking = await updateBooking(newBooking._id, { transactionId });
    res.status(200).json({
      data: updatedBooking,
      success: true,
      message: "Payment made and show booked successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.body.user.userId })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "theater",
          model: "theaters",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      });
    res.status(200).json({
      data: bookings,
      success: true,
      message: "All bookings fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { makePaymentAndBookShow, getAllBookings };
