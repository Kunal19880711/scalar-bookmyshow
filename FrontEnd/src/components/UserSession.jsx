import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setToken, setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../api/user";
import { message } from "antd";

const UserSession = ({ children }) => {
  const { user, token } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const checkUserSession = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response?.data));
      dispatch(hideLoading());
    } catch (e) {
      dispatch(hideLoading());
      message.error(e?.message);
      dispatch(logout());
    } finally {
      dispatch(hideLoading());
    }
  };

  // check for change
  useEffect(() => {
    if (token) {
      localStorage.setItem("tokenForBMS", token);
      if (!user) {
        checkUserSession();
      }
    } else {
      dispatch(setUser(null));
    }
  }, [token]);

  // check for already existing session
  useEffect(() => {
    const token = localStorage.getItem("tokenForBMS");
    console.log(token);
    dispatch(setToken(token));
  }, []);
  return <>{children}</>;
};

export default UserSession;
