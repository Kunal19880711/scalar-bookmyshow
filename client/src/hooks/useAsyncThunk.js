import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { extractErrorMsg } from "../utils";

const useAsyncThunk = (asyncThunk) => {
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(asyncThunk()).catch((err) => {
      message.error(extractErrorMsg(err));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    getData,
  };
};

export default useAsyncThunk;
