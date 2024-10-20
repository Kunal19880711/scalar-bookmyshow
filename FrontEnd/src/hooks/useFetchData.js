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
      const entities = response?.data.map((entity) => ({
        ...entity,
        key: entity._id,
      }));
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