import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Button, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { GetAllTheaters, deleteTheater } from "../../api/theater";
import strings from "../../constants/l10n";

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
    } catch (e) {
      message.error(e?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableHeading = [
    {
      title: strings.PAGES_ADMIN_THEATERLIST_TABLEHEADING_NAME,
      dataIndex: "name",
      key: "name",
    },
    {
      title: strings.PAGES_ADMIN_THEATERLIST_TABLEHEADING_ADDRESS,
      dataIndex: "address",
      key: "address",
    },
    {
      title: strings.PAGES_ADMIN_THEATERLIST_TABLEHEADING_PHONE,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: strings.PAGES_ADMIN_THEATERLIST_TABLEHEADING_EMAIL,
      dataIndex: "email",
      key: "email",
    },
    {
      title: strings.PAGES_ADMIN_THEATERLIST_TABLEHEADING_ACTIONS,
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

  const handleDeleteTheater = async () => {
    try {
      dispatch(showLoading());
      await deleteTheater(selectedTheater?._id);
      setIsDeleteModalOpen(false);
      getData();
      message.success(strings.PAGES_ADMIN_THEATERLIST_DELETE_SUCCESS);
    } catch (e) {
      message.error(e?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div>
      <h1>{strings.PAGES_ADMIN_THEATERLIST_HEADING}</h1>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedTheater(null);
          setFormType("add");
        }}
      >
        {strings.PAGES_ADMIN_THEATERLIST_ADD_THEATER}
      </Button>
      <Table
        columns={tableHeading}
        dataSource={theaters}
        bordered
        pagination={{ pageSize: 10 }}
      />
      {isModalOpen && (
        <Modal
          title={formType === "add" ? strings.PAGES_ADMIN_THEATERLIST_ADD_THEATER : strings.PAGES_ADMIN_THEATERLIST_EDIT_THEATER}
          visible={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <TheaterForm
            formType={formType}
            setIsModalOpen={setIsModalOpen}
            selectedTheater={selectedTheater}
            getData={getData}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          title={strings.PAGES_ADMIN_THEATERLIST_DELETE_THEATER}
          visible={isDeleteModalOpen}
          onOk={handleDeleteTheater}
          onCancel={() => setIsDeleteModalOpen(false)}
        >
          <p>{strings.PAGES_ADMIN_THEATERLIST_DELETE_CONFIRMATION}</p>
        </Modal>
      )}
    </div>
  );
};

export default TheaterList;
