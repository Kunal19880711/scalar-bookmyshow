const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const moment = require("moment");
const mongoose = require("mongoose");
const Booking = require("../models/bookingSchema");
const Show = require("../models/showSchema");
const HttpError = require("../common/HttpError");
const {
  default: emailHelper,
  EMailTemplates,
} = require("../utils/emailHelper");

const addNewBooking = async (booking, session) => {
  const newBooking = new Booking(booking);
  try {
    return await newBooking.save({ session });
  } catch (error) {
    throw error;
  }
};

const checkAndUpdateBookedSeats = async (showId, seats, session) => {
  try {
    // Step 1: Get the show
    const show = await Show.findById(showId).session(session);
    if (!show) {
      throw new HttpError(404, "Show not found");
    }

    // Step 2: Check if seats are not already booked
    const bookedSeatSet = new Set(show.bookedSeats);
    if (seats.some((seat) => bookedSeatSet.has(seat))) {
      throw new HttpError(
        409,
        "Some seats are already booked. Please select some other seats."
      );
    }

    // Step 3: update the seats
    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      { $push: { bookedSeats: { $each: seats } } },
      { new: true, session }
    );

    return updatedShow;
  } catch (error) {
    throw error;
  }
};

const makePayment = async ({ token, amount }) => {
  try {
    // Step 1: Check if customer alreay exists
    const customers = await stripe.customers.list({
      email: token.email,
      limit: 1,
    });

    // Step 2: Create new customer if not exists
    const currCustomer =
      customers.data.length > 0
        ? customers.data[0]
        : await stripe.customers.create({
            source: token.id,
            email: token.email,
          });

    // Step 3: Create PaymentIntend
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: currCustomer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie",
    });

    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

const refundPayment = async (paymentIntent) => {
  try {
    // Create a refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntent.id, // PaymentIntent ID
    });
  } catch (error) {
    console.error(
      `Stripe refund failed for ${paymentIntent.id}. Please look into the issue.`,
      error
    );
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
      show: booking?.show?.name,
      date: booking?.show?.date ? moment(booking.show.date).format("ll") : "",
      time: booking?.show?.time
        ? moment(booking.show.time, "HH:mm").format("hh:mm A")
        : "",
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

const bookTicketsInTransaction = async (
  user,
  show,
  seats,
  amount,
  paymentIntent
) => {
  // Step 1: Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 2: Check and update tickets in the transaction.
    await checkAndUpdateBookedSeats(show, seats, session);

    // Step 3: Create a new booking in the transaction.
    const newbookingObj = {
      show,
      user,
      seats,
      amount,
      transactionId: !paymentIntent
        ? "__DUMMY_TRANSACTION__"
        : paymentIntent.id,
    };
    const newBooking = await addNewBooking(newbookingObj, session);

    // Step 4: Commit the transaction if everything is successful
    await session.commitTransaction();
    session.endSession();

    return newBooking;
  } catch (e) {
    // Step 5: abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw e;
  }
};

const makePaymentAndBookShow = async (req, res, next) => {
  const skipStripePayment =
    process.env.MODE === "DEVELOPMENT" && req.body.skipStripe;
  let paymentIntent = null;
  try {
    // Step 1: Validate the request
    const { show, seats, token, amount } = req.body;
    if (!show || !token || !amount || !Array.isArray(seats)) {
      throw new HttpError(400, "Bad Request: Missing required fields");
    }
    // Step 1.1: Get user
    const user = req.body.user.userId;

    // Step 2: Create Stripe PaymentIntend
    paymentIntent = skipStripePayment
      ? null
      : await makePayment({ token, amount });

    // Step 3: Book Tickets in transaction
    const newBooking = await bookTicketsInTransaction(
      user,
      show,
      seats,
      amount,
      paymentIntent
    );

    // Step 4: Send response
    res.status(200).json({
      data: newBooking,
      success: true,
      message: "Payment made and show booked successfully.",
    });

    // Step 5: Send booking EMail
    sendBookingEmail(newBooking._id);
  } catch (error) {
    // Step 6: Safely refund money if needed
    if (!skipStripePayment && paymentIntent) {
      await refundPayment(paymentIntent);
    }

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
