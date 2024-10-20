import React from "react";
import string from "../constants/l10n";

const Home = () => {
  const {}
  const createMoviePanel = (movie) => (
    <Col
      className="gutter-row mb-5"
      key={movie._id}
      span={{
        xs: 24,
        sm: 24,
        md: 12,
        lg: 10,
      }}
    >
      <div className="text-center">
        <img
          onClick={() => {
            navigate(
              `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
            );
          }}
          className="cursor-pointer"
          src={movie.poster}
          alt="Movie Poster"
          width={200}
          height={300}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
            objectFit: "cover",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
        <h3
          onClick={() => {
            navigate(
              `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
            );
          }}
          className="cursor-pointer"
        >
          {movie.movieName}
        </h3>
      </div>
    </Col>
  );
  return <></>;
};

export default Home;
