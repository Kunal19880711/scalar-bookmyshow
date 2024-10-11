import React, { useEffect } from "react";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../api/user";
import { Layout, Menu, message } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      key: "home",
      onClick: () => navigate("/"),
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
              navigate("/admin");
            } else if (user.role === "partner") {
              navigate("/partner");
            } else {
              navigate("/user");
            }
          },
        },
        {
          label: "Logout",
          icon: <LogoutOutlined />,
          key: "logout",
          onClick: () => {
            localStorage.removeItem("tokenForBMS");
            navigate("/login");
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
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tokenForBMS")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  });
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
