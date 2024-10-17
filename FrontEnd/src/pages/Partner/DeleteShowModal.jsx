import React from "react";
import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { DeleteShow } from "../../api/show";

const DeleteShowModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedShow,
  setSelectedShow,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const showId = selectedShow._id;
      const response = await DeleteShow(showId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
    } finally {
      setSelectedShow(null);
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedShow(null);
  };

  return (
    <Modal
      title="Delete Show?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">Are you sure you want to delete this show?</p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this show data.
      </p>
    </Modal>
  );
};

export default DeleteShowModal;
