import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Col, Input, Row } from "antd";
import useData from "../hooks/useData";
import { GetAllMovies } from "../api/movie";
import string from "../constants/l10n";
import { SearchOutlined } from "@ant-design/icons";
import Paths, { SubPaths } from "../constants/Paths";

const Home = () => {
  const { entities: movies, getData } = useData(GetAllMovies);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const filteredMovies = (movies || []).filter((movie) =>
    movie.movieName.toLowerCase().includes(searchText.toLowerCase())
  );
  const createMoviePath = (movie) =>
    Paths.SingleMovie.replace(SubPaths.IdParamFormat, movie._id) +
    `?date=${moment().format("YYYY-MM-DD")}`;
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
            navigate(createMoviePath(movie));
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
            navigate(createMoviePath(movie));
          }}
          className="cursor-pointer"
        >
          {movie.movieName}
        </h3>
      </div>
    </Col>
  );
  const moviePanels = filteredMovies.map(createMoviePanel);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Row
        className="justify-content-center w-100"
        style={{ padding: "20px 15px 20px 0px" }}
      >
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder={string.HOME_SEARCH_PLACEHOLDER}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {moviePanels}
      </Row>
    </>
  );
};

export default Home;
