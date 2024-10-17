import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Paths from "../constants/Paths";
import strings from "../constants/l10n";
import { logout } from "../redux/userSlice";

const NavBar = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      label: strings.NAVBAR_NAVITEMS_HOME,
      icon: <HomeOutlined />,
      key: "home",
      onClick: () => navigate(Paths.Home),
    },
    {
      label: `${user?.name ?? ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: strings.NAVBAR_NAVITEMS_MY_PROFILE,
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
          label: strings.NAVBAR_NAVITEMS_LOGOUT,
          icon: <LogoutOutlined />,
          key: "logout",
          onClick: () => {
            dispatch(logout());
          },
        },
      ],
    },
  ];

  return (
    <Layout>
      <Layout.Header
        className="d-flex justify-content-between"
        style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      >
        <h3
          className="demo-logo text-white m-0"
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => navigate(Paths.Home)}
        >
          {strings.NAVBAR_HEADING}
        </h3>
        <Menu theme="dark" mode="horizontal" items={navItems} />
      </Layout.Header>
    </Layout>
  );
};

export default NavBar;
