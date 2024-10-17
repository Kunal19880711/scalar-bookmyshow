import React, { useEffect } from "react";
import { Button, Table, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { GetAllTheaters, UpdateTheater } from "../../api/theater";
import strings from "../../constants/l10n";
import { useGetData } from "../../hooks/useGetData";

const TheatreTable = () => {
  const { entities: theaters, getData } = useGetData(GetAllTheaters);
  const toggleStatus = async (theater) => {
    try {
      dispatch(showLoading());
      const response = await UpdateTheater({
        theaterId: theater._id,
        isActive: !theater.isActive,
      });
      if (response.success) {
        getData();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

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
        <div className="d-flex align-items-center gap-10">
          <Button onClick={() => toggleStatus(data)}>
            {data.isActive
              ? strings.THEATERTABLE_ACTION_BLOCK
              : strings.THEATERTABLE_ACTION_APPROVE}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-end gap-10">
        <Button icon={<ReloadOutlined />} onClick={getData}>
          {strings.RELOAD}
        </Button>
      </div>
      <Table columns={tableHeading} dataSource={theaters} />
    </div>
  );
};

export default TheatreTable;
