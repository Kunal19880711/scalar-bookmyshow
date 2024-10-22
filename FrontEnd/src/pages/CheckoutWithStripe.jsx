import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import Paths from "../constants/Paths";
import { MakePaymentAndBookShow } from "../api/booking";

const skipStripe = import.meta.env.VITE_SKIP_STRIPE_CHECKOUT === "YES";
const stripePublicKey = import.meta.env.VITE_STRIPE_PuBLIC_KEY;

const CheckoutWithStripe = ({ show, selectedSeats }) => {
  console.log(import.meta.env.VITE_SKIP_STRIPE_CHECKOUT);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amount = selectedSeats.length * show.ticketPrice;

  const onTokenHandler = async (token) => {
    try {
      dispatch(showLoading());
      const response = await MakePaymentAndBookShow({
        show: params.id,
        seats: selectedSeats,
        amount,
        token,
        skipStripe,
      });
      if (response.success) {
        message.success("Show Booking done!");
        navigate(Paths.Profile);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
      dispatch(hideLoading());
    }
  };

  const stripeCheckout = (
    <StripeCheckout
      token={onTokenHandler}
      amount={amount}
      billingAddress
      stripeKey="pk_test_51QCJxvQnYvzuhKKNbcny313Ay6pkJnpZSRQwuFIJO27npUHEj54tyjjmrxEViaDXYsWYdzopCxuDz5moWCna47XF00Uolhy17D"
    >
      <div className="max-width-600 mx-auto">
        <Button type="primary" shape="round" size="large" block>
          Pay Now
        </Button>
      </div>
    </StripeCheckout>
  );

  const dummyCheckout = (
    <div className="max-width-600 mx-auto">
      <Button
        type="primary"
        shape="round"
        size="large"
        block
        onClick={() => onTokenHandler()}
      >
        Pay Now
      </Button>
    </div>
  );

  return (
    <>
      {!skipStripe && stripeCheckout}
      {skipStripe && dummyCheckout}
    </>
  );
};

export default CheckoutWithStripe;
