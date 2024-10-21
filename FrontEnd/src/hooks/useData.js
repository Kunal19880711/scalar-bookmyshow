import { useEffect } from "react";
import useFetchData from "./useFetchData";

const defaultOps = { deps: [], defaultValue: [] };

const useData = (dataFetcher, options = {}) => {
  const { deps, defaultValue } = { ...defaultOps, ...options };
  const { entities, getData } = useFetchData(dataFetcher, { defaultValue });

  useEffect(() => {
    getData();
  }, deps);

  return { entities, getData };
};

export default useData;
