import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";

const Admin = () => {
  const tabItems = [
    {
      key: "movies",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "theaters",
      label: "Theaters",
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
