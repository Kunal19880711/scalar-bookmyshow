import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import useFetchData from "./useFetchData";

const useData = (dataFetcher) => {
  const {entities, getData} = useFetchData(dataFetcher);

  useEffect(() => {
    getData();
  }, []);

  return { entities, getData };
};

export default useData;