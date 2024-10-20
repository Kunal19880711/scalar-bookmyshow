import { useEffect } from "react";
import useFetchData from "./useFetchData";

const useData = (dataFetcher, deps = []) => {
  const { entities, getData } = useFetchData(dataFetcher);

  useEffect(() => {
    getData();
  }, deps);

  return { entities, getData };
};

export default useData;
