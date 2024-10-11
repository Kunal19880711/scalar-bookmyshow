import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import Paths from "../constants/Paths";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { GetCurrentUser } from "../api/user";

const ProtectedRoute = ({ children }) => {
  const {user} = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      key: "home",
      onClick: () => navigate(Paths.Home),
    },
    {
      label: `${user?.name ?? ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: "My Profile",
          icon: <ProfileOutlined />,
          key: "profile",
          onClick: () => {
            if (user.role === "admin") {
              navigate(Paths.Admin);
            } else if (user.role === "partner") {
              navigate(Paths.Partner);
            } else {
              navigate(Paths.User);
            }
          },
        },
        {
          label: "Logout",
          icon: <LogoutOutlined />,
          key: "logout",
          onClick: () => {
            localStorage.removeItem("tokenForBMS");
            navigate(Paths.Login);
          },
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response?.data));
      console.log(response);
      dispatch(hideLoading());
    } catch (e) {
      // dispatch(hideLoading());
      message.error(e?.message);
      navigate(Paths.Login);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tokenForBMS")) {
      getValidUser();
    } else {
      navigate(Paths.Login);
    }
  }, []);
  return (
    user && (
      <>
        <Layout>
          <Layout.Header
            className="d-flex justify-content-between"
            style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Layout.Header>
        </Layout>
        <div>{children}</div>
      </>
    )
  );
};

export default ProtectedRoute;

