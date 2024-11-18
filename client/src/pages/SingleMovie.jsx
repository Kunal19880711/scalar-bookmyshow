import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { Divider, Row, Col, Input } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import useData from "../hooks/useData";
import { GetMovieById } from "../api/movie";
import { GetAllTheatersByMovie } from "../api/show";
import Paths, { SubPaths } from "../constants/Paths";
import constants from "../constants/constants";

const SingleMovie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(
    DateTime.now().toFormat(constants.MOVIE_RELEASEDATE_FORMAT)
  );
  const { entities: movie } = useData(() => GetMovieById(params.id));
  const { entities: theaters } = useData(
    () => GetAllTheatersByMovie({ movieId: params.id, date }),
    { deps: [date] }
  );
  const createMoviePath = (date) =>
    Paths.SingleMovie.replace(SubPaths.IdParamFormat, params.id) +
    `?date=${date}`;
  const createBookShowPath = (showId) =>
    Paths.BookShow.replace(SubPaths.IdParamFormat, showId);

  const handleDate = (e) => {
    setDate(
      DateTime.fromISO(e.target.value).toFormat(
        constants.MOVIE_RELEASEDATE_FORMAT
      )
    );
    navigate(createMoviePath(e.target.value));
  };

  const createSingleShow = (singleShow) => (
    <li
      key={singleShow._id}
      onClick={() => navigate(createBookShowPath(singleShow._id))}
    >
      {DateTime.fromISO(singleShow.time).toFormat(constants.SHOWTIME_FORMAT)}
    </li>
  );

  const createShows = (shows) =>
    shows
      .sort((a, b) => DateTime.fromISO(a.time).diff(DateTime.fromISO(b.time)))
      .map(createSingleShow);

  const createSingleTheater = (theater) => (
    <div key={theater._id}>
      <Row gutter={24} key={theater._id}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3>{theater.name}</h3>
          <p>{theater.address}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <ul className="show-ul">{createShows(theater.shows)}</ul>
        </Col>
      </Row>
      <Divider />
    </div>
  );

  const createTheaters = (theaters) => (
    <div className="theatre-wrapper mt-3 pt-3">
      <h2>Theaters</h2>
      {theaters.map(createSingleTheater)}
    </div>
  );

  const noTheaterFound = (
    <div className="pt-3">
      <h2 className="blue-clr">
        Currently, no theatres available for this movie!
      </h2>
    </div>
  );

  const createMovie = (movie) => (
    <div className="d-flex single-movie-div">
      <div className="flex-Shrink-0 me-3 single-movie-img">
        <img src={movie.poster} width={150} alt="Movie Poster" />
      </div>
      <div className="w-100">
        <h1 className="mt-0">{movie.title}</h1>
        <p className="movie-data">
          Language: <span>{movie.language}</span>
        </p>
        <p className="movie-data">
          Genre: <span>{movie.genre}</span>
        </p>
        <p className="movie-data">
          Release Date:
          <span>
            {DateTime.fromISO(movie.releaseDate).toFormat(
              constants.USER_VIEW_MOVIE_RELEASEDATE_FORMAT
            )}
          </span>
        </p>
        <p className="movie-data">
          Duration: <span>{movie.duration} Minutes</span>
        </p>
        <hr />
        <div className="d-flex flex-column-mob align-items-center mt-3">
          <label className="me-3 flex-shrink-0">Choose the date:</label>
          <Input
            onChange={handleDate}
            type="date"
            min={DateTime.now().toFormat(constants.MOVIE_RELEASEDATE_FORMAT)}
            className="max-width-300 mt-8px-mob"
            value={date}
            placeholder="default size"
            prefix={<CalendarOutlined />}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="inner-container" style={{ paddingTop: "20px" }}>
      {movie && createMovie(movie)}
      {theaters.length === 0 && noTheaterFound}
      {theaters.length > 0 && createTheaters(theaters)}
    </div>
  );
};

export default SingleMovie;
