import React, { useState } from "react";
import moment from "moment";
import { Button, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import strings from "../../constants/l10n";
import { DeleteMovie } from "../../api/movie";
import MovieForm from "./MovieForm";
import DeleteEntityModal from "../../components/DeleteEntityModal";
import { useSelector } from "react-redux";
import useAsyncThunk from "../../hooks/useAsyncThunk";
import { getMoviesThunk } from "../../redux/moviesSlice";

const MovieList = () => {
  const { movies } = useSelector((state) => state.movies);
  const { getData } = useAsyncThunk(getMoviesThunk);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");

  const tableHeading = [
    {
      title: strings.MOVIELIST_TABLEHEADING_POSTER,
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
      title: strings.MOVIELIST_TABLEHEADING_NAME,
      dataIndex: "movieName",
      key: "movieName",
    },
    {
      title: strings.MOVIELIST_TABLEHEADING_DESCRIPTION,
      dataIndex: "description",
      key: "description",
    },
    {
      title: strings.MOVIELIST_TABLEHEADING_DURATION,
      dataIndex: "duration",
      key: "duration",
      render: (text) => `${text} min`,
    },
    {
      title: strings.MOVIELIST_TABLEHEADING_GENRE,
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: strings.MOVIELIST_TABLEHEADING_LANGUAGE,
      dataIndex: "language",
      key: "language",
    },
    {
      title: strings.MOVIELIST_TABLEHEADING_RELEASEDATE,
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (text, data) => moment(data.releaseDate).format("MM-DD-YYYY"),
    },
    {
      title: strings.MOVIELIST_TABLEHEADING_ACTIONS,
      key: "actions",
      render: (text, data) => (
        <div className="d-flex align-items-center gap-10">
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

  return (
    <div>
      <div className="d-flex justify-content-end gap-10">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
            setSelectedMovie(null);
          }}
        >
          {strings.MOVIELIST_ADD_MOVIE}
        </Button>
        <Button icon={<ReloadOutlined />} onClick={getData}>
          {strings.RELOAD}
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
        <DeleteEntityModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedEntity={selectedMovie}
          setSelectedEntity={setSelectedMovie}
          getData={getData}
          deleteApi={DeleteMovie}
          title="Delete Movie?"
          entityName="movie"
        />
      )}
    </div>
  );
};

export default MovieList;
