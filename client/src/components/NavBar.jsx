import "./NavBar.css";
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
import strings from "../constants/l10n";
import { logout } from "../redux/userSlice";
import { LogoutUser } from "../api/user";
import { extractErrorMsg } from "../utils";

const NavBar = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = async () => {
    try {
      const response = await LogoutUser();
      if (response?.success) {
        message.success(response?.message);
        dispatch(logout());
      } else {
        message.error(response?.message);
      }
    } catch (err) {
      message.error(extractErrorMsg(err));
    }
  };

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
              navigate(Paths.Profile);
            }
          },
        },
        {
          label: strings.NAVBAR_NAVITEMS_LOGOUT,
          icon: <LogoutOutlined />,
          key: "logout",
          onClick: onLogoutClick,
        },
      ],
    },
  ];

  return (
    <Layout className="navbar-layout">
      <Layout.Header className="d-flex justify-content-between">
        <div
          className="d-flex align-items-center gap-10 cursor-pointer color-white"
          onClick={() => navigate(Paths.Home)}
        >
          <img
            src="/bookmymovie.svg"
            alt="BookMyMovie Logo"
            height={64}
            width={64}
          />
          <h3 className="demo-logo text-white m-0">{strings.NAVBAR_HEADING}</h3>
        </div>
        <Menu theme="dark" mode="horizontal" items={navItems} />
      </Layout.Header>
    </Layout>
  );
};

export default NavBar;
