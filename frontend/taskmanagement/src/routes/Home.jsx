import React from "react";
import Sidebar from "../components/Sidebar";
import AllTask from "../components/AllTask";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <AllTask />
    </>
  );
};

export default Home;
