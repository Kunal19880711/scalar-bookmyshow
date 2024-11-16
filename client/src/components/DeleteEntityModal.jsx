import React from "react";
import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";

const DeleteEntityModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedEntity,
  setSelectedEntity,
  getData,
  deleteApi,
  title,
  entityName,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const entityId = selectedEntity._id;
      const response = await deleteApi(entityId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
    } finally {
      setSelectedEntity(null);
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedEntity(null);
  };

  return (
    <Modal
      title={title}
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">
        Are you sure you want to delete this {entityName}?
      </p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this {entityName} data.
      </p>
    </Modal>
  );
};

export default DeleteEntityModal;
