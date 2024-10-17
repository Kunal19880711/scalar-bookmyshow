import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { Button, Table, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { GetAllShowsByTheater } from "../../api/show";
import strings from "../../constants/l10n";
import ShowForm from "./ShowForm";
import DeleteShowModal from "./DeleteShowModal";

const ShowList = ({ theater, movies }) => {
  const [shows, setShows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllShowsByTheater({ theaterId: theater._id });
      const allShows = response?.data.map((show) => ({
        ...show,
        key: show._id,
      }));
      setShows(allShows);
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
      title: strings.SHOWLIST_TABLEHEADING_NAME,
      dataIndex: "name",
      key: "name",
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_DATE,
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_TIME,
      dataIndex: "time",
      key: "time",
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_MOVIE,
      dataIndex: "movieId",
      key: "movieId",
      render: (text, data) => data.movie.movieName,
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_TICKET_PRICE,
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_TOTAL_SEATS,
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_AVAILABLE_SEATS,
      dataIndex: "availableSeats",
      key: "availableSeats",
      render: (text, data) => data.totalSeats - data.bookedSeats.length,
    },

    {
      title: strings.SHOWLIST_TABLEHEADING_ACTIONS,
      dataIndex: "actions",
      key: "actions",
      render: (_, show) => (
        <div className="d-flex align-items-center gap-10">
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setSelectedShow(show);
              setFormType("edit");
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedShow(show);
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
            setSelectedShow(null);
            setFormType("add");
          }}
        >
          {strings.SHOWLIST_ADD_SHOW}
        </Button>
        <Button icon={<ReloadOutlined />} onClick={getData}>
          {strings.RELOAD}
        </Button>
      </div>
      <Table columns={tableHeading} dataSource={shows} />
      {isModalOpen && (
        <ShowForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedShow={selectedShow}
          setSelectedShow={setSelectedShow}
          getData={getData}
          formType={formType}
          theater={theater}
          movies={movies}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteShowModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedShow={selectedShow}
          setSelectedShow={setSelectedShow}
          getData={getData}
        />
      )}
    </div>
  );
};

export default ShowList;
