import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";
import strings from "../../constants/l10n";

const Admin = () => {
  const tabItems = [
    {
      key: "movies",
      label: strings.PAGES_ADMIN_TABS_MOVIES,
      children: <MovieList />,
    },
    {
      key: "theaters",
      label: strings.PAGES_ADMIN_TABS_THEATERS,
      children: <TheatreTable />,
    },
  ];
  return (
    <div>
      <h1>Admin</h1>
      <Tabs defaultActiveKey="movies" items={tabItems} />
    </div>
  );
};

export default Admin;
