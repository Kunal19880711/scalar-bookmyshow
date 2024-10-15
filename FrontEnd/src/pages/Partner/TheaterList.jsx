import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Button, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { GetAllTheaters } from "../../api/theater";
import strings from "../../constants/l10n";
import TheaterForm from "./TheaterForm";
import DeleteTheaterModal from "./DeleteTheaterModal";

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllTheaters();
      const allTheaters = response?.data.map((theater) => ({
        ...theater,
        key: theater._id,
      }));
      setTheaters(allTheaters);
      dispatch(hideLoading());
    } catch (err) {
      message.error(err?.message);
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
        <div>
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

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedTheater(null);
            setFormType("add");
          }}
        >
          {strings.THEATERLIST_ADD_THEATER}
        </Button>
      </div>
      <Table columns={tableHeading} dataSource={theaters} />
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
        <DeleteTheaterModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          getData={getData}
        />
      )}
    </div>
  );
};

export default TheaterList;
