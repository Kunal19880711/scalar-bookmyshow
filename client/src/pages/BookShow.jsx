import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { Row, Col, Card } from "antd";
import { GetShowById } from "../api/show";
import useData from "../hooks/useData";
import CheckoutWithStripe from "./CheckoutWithStripe";
import constants from "../constants/constants";

const BookShow = () => {
  const params = useParams();
  const { entities: show, getData } = useData(
    () => GetShowById({ showId: params.id }),
    {
      defaultValue: null,
    }
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  const selectedSeatSet = new Set(selectedSeats);
  const bookedSeatSet = new Set(show?.bookedSeats || []);

  const reset = () => {
    setSelectedSeats([]);
    getData();
  };

  const seatClickHandler = (seatNumber) => {
    if (bookedSeatSet.has(seatNumber)) {
      return;
    }
    if (selectedSeatSet.has(seatNumber)) {
      selectedSeatSet.delete(seatNumber);
      setSelectedSeats([...selectedSeatSet]);
      return;
    }
    selectedSeatSet.add(seatNumber);
    setSelectedSeats([...selectedSeatSet]);
  };

  const createSeat = (row, column, columns) => {
    let seatNumber = row * columns + column + 1;
    let seatClass = "seat-btn";
    if (selectedSeatSet.has(seatNumber)) {
      seatClass += " selected";
    }
    if (bookedSeatSet.has(seatNumber)) {
      seatClass += " booked";
    }
    if (seatNumber > show.totalSeats) {
      return null;
    }

    return (
      <li key={seatNumber}>
        <button
          onClick={() => seatClickHandler(seatNumber)}
          className={seatClass}
        >
          {seatNumber}
        </button>
      </li>
    );
  };

  const createSeats = () => {
    let columns = 12;
    let totalSeats = show.totalSeats;
    let rows = Math.ceil(totalSeats / columns);

    const seating = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: columns }, (_, column) =>
        createSeat(row, column, columns)
      )
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
          <ul className="seat-ul justify-content-center">{seating}</ul>
        </div>
      </div>
    );
  };

  const createShow = (show) => (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title={
            <div className="movie-title-details">
              <h1>{show.movie.movieName}</h1>
              <p>
                Theatre: {show.theater.name}, {show.theater.address}
              </p>
            </div>
          }
          extra={
            <div className="show-name py-3">
              <h3>
                <span>Show Name:</span> {show.name}
              </h3>
              <h3>
                <span>Date & Time: </span>
                {DateTime.fromISO(show.date).toFormat(
                  constants.USER_VIEW_MOVIE_RELEASEDATE_FORMAT
                )}
                &nbsp; at &nbsp;
                {DateTime.fromISO(show.time).toFormat(
                  constants.SHOWTIME_FORMAT
                )}
              </h3>
              <h3>
                <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
              </h3>
              <h3>
                <span>Total Seats:</span> {show.totalSeats}
                <span> &nbsp;|&nbsp; Available Seats:</span>
                {show.totalSeats - show.bookedSeats.length}
              </h3>
            </div>
          }
          style={{ width: "100%" }}
        >
          {createSeats()}
          {selectedSeats.length > 0 && (
            <CheckoutWithStripe
              show={show}
              selectedSeats={selectedSeats}
              reset={reset}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
  return <div>{show && createShow(show)}</div>;
};

export default BookShow;
