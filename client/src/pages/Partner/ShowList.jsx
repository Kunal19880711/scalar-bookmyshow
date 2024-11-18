import React, { useState } from "react";
import { DateTime } from "luxon";
import { Button, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { DeleteShow, GetAllShowsByTheater } from "../../api/show";
import strings from "../../constants/l10n";
import ShowForm from "./ShowForm";
import useData from "../../hooks/useData";
import DeleteEntityModal from "../../components/DeleteEntityModal";
import constants from "../../constants/constants";

const ShowList = ({ theater, movies }) => {
  const { entities: shows, getData } = useData(() =>
    GetAllShowsByTheater({ theaterId: theater._id })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [formType, setFormType] = useState("add");

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
      render: (date) => DateTime.fromISO(date).toFormat(constants.SHOWDATE_FORMAT),
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_TIME,
      dataIndex: "time",
      key: "time",
      render: (time) => DateTime.fromISO(time).toFormat(constants.SHOWTIME_FORMAT),
    },
    {
      title: strings.SHOWLIST_TABLEHEADING_MOVIE,
      dataIndex: "movieId",
      key: "movieId",
      render: (text, data) => data.movie?.movieName,
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
              setSelectedShow({
                ...show,
                movie: show.movie?._id,
                date: DateTime.fromISO(show.date).toFormat(constants.MOVIE_RELEASEDATE_FORMAT),
              });
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
        <DeleteEntityModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedEntity={selectedShow}
          setSelectedEntity={setSelectedShow}
          getData={getData}
          deleteApi={DeleteShow}
          title="Delete Show?"
          entityName="show"
        />
      )}
    </div>
  );
};

export default ShowList;
