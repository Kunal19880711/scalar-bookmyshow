import { Tabs } from "antd";
import React from "react";
import TheaterList from "./TheaterList";

const Partner = () => {
  const tabItems = [
    {
      key: "theater",
      label: "Theater",
      children: <TheaterList />,
    },
  ];
  return (
    <div>
      <h1>Partner</h1>
      <Tabs defaultActiveKey="movies" items={tabItems} />
    </div>
  );
};

export default Partner;
