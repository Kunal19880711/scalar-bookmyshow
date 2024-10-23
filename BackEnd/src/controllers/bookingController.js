const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const moment = require("moment");
const Booking = require("../models/bookingSchema");
const Show = require("../models/showSchema");
const HttpError = require("../common/HttpError");
const {
  default: emailHelper,
  EMailTemplates,
} = require("../utils/emailHelper");

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

const sendBookingEmail = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theater",
          model: "theaters",
        },
      })
      .populate("user");
    const emailMapping = {
      name: booking?.user?.name,
      movie: booking?.show?.movie?.movieName,
      poster: booking?.show?.movie?.poster,
      theater: booking?.show?.theater?.name,
      address: booking?.show?.theater?.address,
      date: booking?.show?.date ? moment(booking.show.date).format("ll") : "",
      time: booking?.show?.time,
      seats: booking?.seats.join(", "),
      amount: booking?.amount,
      transactionId: booking?.transactionId,
    };
    await emailHelper(
      EMailTemplates.TicketTemplate,
      booking?.user?.email,
      emailMapping
    );
  } catch (e) {
    console.error("Not able to send EMail. Please note", e);
  }
};

const makePaymentAndBookShow = async (req, res, next) => {
  try {
    const newBooking = await addNewBooking({
      ...req.body,
      user: req.body.user.userId,
      transactionId: "__NO_TRANSACTION_YET__",
    });
    const { token, amount, show, seats } = req.body;

    let transactionId = "__DUMMY_TRANSACTION__";
    if (!(process.env.MODE === "DEVELOPMENT") || !req.body.skipStripe) {
      transactionId = await makePayment({ token, amount });
    }

    await updateShowBookedSeats(show, seats);
    const updatedBooking = await updateBooking(newBooking._id, {
      transactionId,
    });

    sendBookingEmail(newBooking._id);

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
