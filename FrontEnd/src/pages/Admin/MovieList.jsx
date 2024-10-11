import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { Table, message } from "antd";

import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { GetAllMovies } from "../../api/movie";

const tableHeading = [
  {
    title: "Poster",
    dataIndex: "poster",
    key: "poster",
    render: (text, data) => (
      <img
        width="75"
        height="115"
        style={{ objectFit: "cover" }}
        src={data?.poster}
        alt="poster"
      />
    ),
  },
  {
    title: "Movie Name",
    dataIndex: "movieName",
    key: "movieName",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    render: (text) => `${text} min`,
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Release Date",
    dataIndex: "releaseDate",
    key: "releaseDate",
    render: (text) => DateTime.fromISO(text).toFormat("dd-MM-yyyy"),
  },
];

const MovieList = () => {
  const [movies, setMovies] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllMovies();
      const allMovies = response?.data;
      setMovies(allMovies);
      dispatch(hideLoading());
    } catch (e) {
      message.error(e?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={tableHeading} dataSource={movies} />
    </div>
  );
};

export default MovieList;
