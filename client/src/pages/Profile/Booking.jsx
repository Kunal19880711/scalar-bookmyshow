import React from "react";
import { Row, Col, Card } from "antd";
import useData from "../../hooks/useData";
import { GetAllBookings } from "../../api/booking";
import { DateTime } from "luxon";
import constants from "../../constants/constants";

const Booking = () => {
  const { entities: bookings } = useData(GetAllBookings);
  const createBookingView = (booking) => (
    <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
      <Card className="mb-3">
        <div className="d-flex flex-column-mob">
          <div className="flex-shrink-0">
            <img
              src={booking.show.movie.poster}
              width={100}
              alt="Movie Poster"
            />
          </div>
          <div className="show-details flex-1">
            <h3 className="mt-0 mb-0">{booking.show.movie.title}</h3>
            <p>
              Theatre: <b>{booking.show.theater.name}</b>
            </p>
            <p>
              Seats: <b>{booking.seats.join(", ")}</b>
            </p>
            <p>
              Date & Time:
              <b>
                {DateTime.fromISO(booking.show.date).toFormat(
                  constants.USER_VIEW_MOVIE_RELEASEDATE_FORMAT
                )}
                &nbsp;
                {DateTime.fromISO(booking.show.time).toFormat(
                  constants.SHOWTIME_FORMAT
                )}
              </b>
            </p>
            <p>
              Amount:
              <b>Rs.{booking.seats.length * booking.show.ticketPrice}</b>
            </p>
            <p>
              Booking ID: <b>{booking.transactionId} </b>
            </p>
          </div>
        </div>
      </Card>
    </Col>
  );
  const createBookingsView = (bookings) => (
    <Row gutter={24}>{bookings.map(createBookingView)}</Row>
  );
  return <>{bookings && createBookingsView(bookings)}</>;
};

export default Booking;
