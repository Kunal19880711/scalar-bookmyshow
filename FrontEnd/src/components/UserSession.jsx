import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setToken, setUser, setInitializing } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../api/user";
import { message } from "antd";
import { setLogoutInterceptor } from "../api";

const UserSession = ({ children }) => {
  const { user, token, initializing } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const checkUserSession = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response?.data));
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err?.message);
      dispatch(logout());
    } finally {
      dispatch(hideLoading());
    }
  };

  // check for change
  useEffect(() => {
    if (initializing) {
      return;
    }
    if (token) {
      localStorage.setItem("tokenForBMS", token);
      if (!user) {
        checkUserSession();
      }
    } else {
      dispatch(setUser(null));
    }
  }, [token, initializing]);

  // check for already existing session
  useEffect(() => {
    const token = localStorage.getItem("tokenForBMS");
    console.log(token);
    if (token) {
      dispatch(setToken(token));
      checkUserSession().finally(() => {
        dispatch(setInitializing(false));
      });
    } else {
      dispatch(setInitializing(false));
    }
  }, []);

  // setting logout interceptor
  useEffect(() => {
    if (initializing) {
      return;
    }
    setLogoutInterceptor(() => {
      if (user) {
        dispatch(logout());
      }
    });
  }, [initializing]);

  return <>{children}</>;
};

export default UserSession;
