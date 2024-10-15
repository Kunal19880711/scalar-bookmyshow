import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Button, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/loaderSlice";

import strings from "../../constants/l10n";
import { GetAllMovies } from "../../api/movie";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllMovies();
      const allMovies = response?.data.map((movie) => ({
        ...movie,
        key: movie._id,
      }));
      setMovies(allMovies);
      dispatch(hideLoading());
    } catch (e) {
      message.error(e?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const tableHeading = [
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_POSTER,
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
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_NAME,
      dataIndex: "movieName",
      key: "movieName",
    },
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_DESCRIPTION,
      dataIndex: "description",
      key: "description",
    },
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_DURATION,
      dataIndex: "duration",
      key: "duration",
      render: (text) => `${text} min`,
    },
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_GENRE,
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_LANGUAGE,
      dataIndex: "language",
      key: "language",
    },
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_RELEASEDATE,
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (text, data) => moment(data.releaseDate).format("MM-DD-YYYY"),
    },
    {
      title: strings.PAGES_ADMIN_MOVIELIST_TABLEHEADING_ACTIONS,
      key: "actions",
      render: (text, data) => (
        <div>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setSelectedMovie(data);
              setFormType("edit");
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedMovie(data);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
            setSelectedMovie(null);
          }}
        >
          {strings.PAGES_ADMIN_MOVIELIST_ADD_MOVIE}
        </Button>
      </div>
      <Table columns={tableHeading} dataSource={movies} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
          formType={formType}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
};

export default MovieList;