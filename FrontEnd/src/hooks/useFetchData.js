import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { showLoading, hideLoading } from "../redux/loaderSlice";

const useFetchData = (dataFetcher) => {
  const dispatch = useDispatch();
  const [entities, setEntities] = useState([]);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await dataFetcher();
      const entities = Array.isArray(response?.data)
        ? response?.data.map((entity) => ({
            ...entity,
            key: entity._id,
          }))
        : response?.data;
      setEntities(entities);
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return { entities, getData };
};

export default useFetchData;
