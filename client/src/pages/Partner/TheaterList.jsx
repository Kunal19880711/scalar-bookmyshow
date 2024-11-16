import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { GetAllMovies } from "../../api/movie";
import { DeleteTheater, GetAllTheaters } from "../../api/theater";
import strings from "../../constants/l10n";
import TheaterForm from "./TheaterForm";
import ShowList from "./ShowList";
import DeleteEntityModal from "../../components/DeleteEntityModal";

const TheaterList = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const movieResponse = await GetAllMovies();
      const allMovies = movieResponse?.data.map((movie) => ({
        ...movie,
        key: movie._id,
      }));
      const response = await GetAllTheaters();
      const allTheaters = response?.data.map((theater) => ({
        ...theater,
        key: theater._id,
      }));
      setMovies(allMovies);
      setTheaters(allTheaters);
      dispatch(hideLoading());
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableHeading = [
    {
      title: strings.THEATERLIST_TABLEHEADING_NAME,
      dataIndex: "name",
      key: "name",
    },
    {
      title: strings.THEATERLIST_TABLEHEADING_ADDRESS,
      dataIndex: "address",
      key: "address",
    },
    {
      title: strings.THEATERLIST_TABLEHEADING_PHONE,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: strings.THEATERLIST_TABLEHEADING_EMAIL,
      dataIndex: "email",
      key: "email",
    },
    Table.EXPAND_COLUMN,
    {
      title: strings.THEATERLIST_TABLEHEADING_STATUS,
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) =>
        isActive
          ? strings.THEATERLIST_STATUS_ACTIVE
          : strings.THEATERLIST_STATUS_INACTIVE,
    },
    {
      title: strings.THEATERLIST_TABLEHEADING_ACTIONS,
      dataIndex: "actions",
      key: "actions",
      render: (text, data) => (
        <div className="d-flex align-items-center gap-10">
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setSelectedTheater(data);
              setFormType("edit");
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedTheater(data);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const expandableConfig = {
    expandedRowRender: (theater) => (
      <div className="card">
        <ShowList theater={theater} movies={movies} />
      </div>
    ),
    expandIcon: ({ onExpand, record }) =>
      record.isActive && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={(e) => onExpand(record, e)}
        >
          {strings.THEATERLIST_ACTION_SHOWS}
        </Button>
      ),
    rowExpandable: (theater) => theater.isActive,
  };

  return (
    <div>
      <div className="d-flex justify-content-end gap-10">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedTheater(null);
            setFormType("add");
          }}
        >
          {strings.THEATERLIST_ADD_THEATER}
        </Button>
        <Button icon={<ReloadOutlined />} onClick={getData}>
          {strings.RELOAD}
        </Button>
      </div>
      <Table
        columns={tableHeading}
        dataSource={theaters}
        expandable={expandableConfig}
      />
      {isModalOpen && (
        <TheaterForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          getData={getData}
          formType={formType}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteEntityModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedEntity={selectedTheater}
          setSelectedEntity={setSelectedTheater}
          getData={getData}
          deleteApi={DeleteTheater}
          title="Delete Theater?"
          entityName="theater"
        />
      )}
    </div>
  );
};

export default TheaterList;
